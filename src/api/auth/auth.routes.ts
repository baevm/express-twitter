import { Router } from 'express'
import { AuthDto } from './auth.dto'
import AuthService from './auth.service'
import { validationMiddleware } from '@config/validationMiddleware'
import { ACCESS_TOKEN, ACCESS_TOKEN_EXP, REFRESH_TOKEN, REFRESH_TOKEN_EXP } from '@api/auth/auth.const'

const domain = undefined
const authRouter = Router()

authRouter.post('/signup', validationMiddleware(AuthDto), async (req, res, next) => {
  try {
    const user: AuthDto = req.body
    const data = await AuthService.signup(user)
    return res.status(data.status).send({ message: data.message, status: data.status })
  } catch (error) {
    next(error)
  }
})

authRouter.post('/login', validationMiddleware(AuthDto), async (req, res, next) => {
  try {
    const user: AuthDto = req.body
    const tokens = await AuthService.login(user)

    res.cookie(REFRESH_TOKEN, tokens.refreshToken, {
      secure: true,
      maxAge: REFRESH_TOKEN_EXP,
      sameSite: 'none',
      domain: domain,
      httpOnly: true,
    })

    res.cookie(ACCESS_TOKEN, tokens.accessToken, {
      secure: true,
      maxAge: ACCESS_TOKEN_EXP,
      sameSite: 'none',
      domain: domain,
      httpOnly: true,
    })

    return res.status(200).send({ tokens })
  } catch (error) {
    next(error)
  }
})

authRouter.post('/refresh', async (req, res, next) => {
  try {
    const user: { userId: string; rt: string } = req.body

    const tokens = await AuthService.refreshToken(user.userId, user.rt)

    res.cookie(REFRESH_TOKEN, tokens.refreshToken, {
      secure: true,
      maxAge: REFRESH_TOKEN_EXP,
      sameSite: 'none',
      domain: domain,
      httpOnly: true,
    })

    res.cookie(ACCESS_TOKEN, tokens.accessToken, {
      secure: true,
      maxAge: ACCESS_TOKEN_EXP,
      sameSite: 'none',
      domain: domain,
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

    res.cookie(REFRESH_TOKEN, '', {
      secure: true,
      maxAge: 1,
      sameSite: 'none',
      domain: domain,
      httpOnly: true,
    })

    res.cookie(ACCESS_TOKEN, '', {
      secure: true,
      maxAge: 1,
      sameSite: 'none',
      domain: domain,
      httpOnly: true,
    })

    return res.status(200).send({ message: 'ok' })
  } catch (error) {
    next(error)
  }
})

export { authRouter }
