import { AuthDto } from '@api/auth/auth.dto'
import userService from '@api/user/user.service'
import { HttpError } from '@api/utils/HTTPError'
import { HttpStatus } from '@api/utils/HTTPStatus'
import jwt from 'jsonwebtoken'
import argon2 from 'argon2'
import prisma from '@api/prisma/prisma.service'
import { Response } from 'express'

const login = async (userData: AuthDto) => {
  const isExistUser = await userService.findUserByUsername(userData.username)

  if (!isExistUser) {
    throw new HttpError(HttpStatus.NOT_FOUND, 'Username doesnt exist')
  }

  const isPassMatch = await argon2.verify(isExistUser.password, userData.password)

  if (!isPassMatch) {
    throw new HttpError(HttpStatus.BAD_REQUEST, 'Incorrect password')
  }

  const { accessToken, refreshToken } = await generateTokens(isExistUser.id, isExistUser.username)

  await updateRtHash(isExistUser.id, refreshToken)

  return { accessToken, refreshToken }
}

const signup = async (userData: AuthDto) => {
  const existUser = await userService.findUserByUsername(userData.username)

  if (existUser) {
    throw new HttpError(HttpStatus.BAD_REQUEST, 'User with this username already exists')
  }

  const hashedPass = await hashData(userData.password)

  const user = await userService.createUser({ ...userData, password: hashedPass })

  return { message: 'Success', status: HttpStatus.OK }
}

const refreshToken = async (userId: string, rt: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  if (!user || !user.hashedRt) {
    throw new HttpError(HttpStatus.BAD_REQUEST, 'Access denied.')
  }

  const rtMatches = await argon2.verify(user.hashedRt, rt)

  if (!rtMatches) {
    throw new HttpError(HttpStatus.BAD_REQUEST, 'Access denied.')
  }

  const tokens = await generateTokens(user.id, user.username)

  await updateRtHash(user.id, tokens.refreshToken)

  return tokens
}

const logout = async (userId: string) => {
  return prisma.user
    .updateMany({
      where: {
        id: userId,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    })
    .catch((error) => {
      throw new HttpError(HttpStatus.INTERNAL_SERVER, 'Something went wrong.')
    })
}

const generateTokens = async (userId: string, username: string) => {
  const [at, rt] = await Promise.all([
    jwt.sign({ sub: userId, username }, 'at-secret', { expiresIn: '30m' }),
    jwt.sign({ sub: userId, username }, 'rt-secret', { expiresIn: '7d' }),
  ])

  return { accessToken: at, refreshToken: rt }
}

const updateRtHash = async (userId: string, rt: string) => {
  const hashedRt = await hashData(rt)

  return prisma.user.update({ where: { id: userId }, data: { hashedRt } })
}

const hashData = async (data: string) => {
  return argon2.hash(data, { saltLength: 10 })
}

export default { login, signup, refreshToken, logout }
