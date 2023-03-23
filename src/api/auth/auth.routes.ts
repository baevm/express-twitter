import { Router } from 'express'
import AuthController from './auth.controller'

const authRouter = Router()

authRouter.post('/signup', AuthController.signup)

authRouter.post('/login', AuthController.login)

authRouter.post('/refreshToken', AuthController.refreshToken)

authRouter.post('/logout', AuthController.logout)

export { authRouter }
