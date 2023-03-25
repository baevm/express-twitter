import { HttpError } from '@api/utils/HTTPError'
import { HttpStatus } from '@api/utils/HTTPStatus'
import { isProduction } from '@api/utils/isProduction'
import { validate, ValidationError } from 'class-validator'
import { Router } from 'express'
import { AuthDto } from './auth.dto'
import AuthService from './auth.service'

const authRouter = Router()
const ACCESS_TOKEN_EXP = 60 * 30 * 1000
const REFRESH_TOKEN_EXP = 60 * 60 * 24 * 7 * 1000

authRouter.post('/signup', async (req, res, next) => {
  try {
    const user: AuthDto = req.body
    const data = await AuthService.signup(user)
    return res.status(data.status).send({ message: data.message, status: data.status })
  } catch (error) {
    next(error)
  }
})

authRouter.post('/login', async (req, res, next) => {
  try {
    const test = new AuthDto()
    test.username = req.body.username
    test.password = req.body.password

    const errors = await validate(test)

    if (errors.length > 0) {
      const dtoErrors = errors.map((error: ValidationError) => ({
        field: error.property,
        error: (Object as any).values(error.constraints).join('. '),
      }))
      throw { message: dtoErrors, status: HttpStatus.BAD_REQUEST, error: new Error() }
    }

    const user: AuthDto = req.body
    const tokens = await AuthService.login(user)

    res.cookie('refresh_token', tokens.refreshToken, {
      //secure: true,
      maxAge: REFRESH_TOKEN_EXP,
      sameSite: 'none',
      domain: isProduction ? 'DOMAIN' : 'localhost',
      //httpOnly: true,
    })

    res.cookie('access_token', tokens.accessToken, {
      //secure: true,
      maxAge: ACCESS_TOKEN_EXP,
      sameSite: 'none',
      domain: isProduction ? 'DOMAIN' : 'localhost',
      //httpOnly: true,
    })

    return res.status(200).send({ tokens })
  } catch (error) {
    next(error)
  }
})

authRouter.post('/refreshToken', async (req, res, next) => {
  try {
    const user: { userId: string; rt: string } = req.body

    const tokens = await AuthService.refreshToken(user.userId, user.rt)

    res.cookie('refresh_token', tokens.refreshToken, {
      secure: true,
      maxAge: REFRESH_TOKEN_EXP,
      sameSite: 'none',
      domain: isProduction ? 'DOMAIN' : undefined,
      httpOnly: true,
    })

    res.cookie('access_token', tokens.accessToken, {
      secure: true,
      maxAge: ACCESS_TOKEN_EXP,
      sameSite: 'none',
      domain: isProduction ? 'DOMAIN' : undefined,
      httpOnly: true,
    })

    return res.status(200).send({ tokens })
  } catch (error) {
    next(error)
  }
})

authRouter.post('/logout', async (req, res, next) => {
  const userId: string = req.body.userId

  try {
    await AuthService.logout(userId)
    return res.status(200).send({ message: 'ok' })
  } catch (error) {
    next(error)
  }
})

export { authRouter }
