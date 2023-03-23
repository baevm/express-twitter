import prisma from '@api/prisma/prisma.service'
import { Request, Response } from 'express'

const getUserInfo = (req: Request, res: Response) => {
  return 'not implemented'
}

const findUserByUsername = (username: string) => {
  return prisma.user.findUnique({
    where: {
      username,
    },
  })
}

const createUser = (user: { username: string; password: string }) => {
  return prisma.user.create({
    data: {
      username: user.username,
      password: user.password,
      tweetsCount: 0,
    },
  })
}

export default { getUserInfo, findUserByUsername, createUser }
