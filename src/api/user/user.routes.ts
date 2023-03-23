import { Router } from 'express'
import UserController from './user.controller'

const userRouter = Router()

userRouter.get('/userInfo', UserController.getUserInfo)

export { userRouter }
