import { Router } from 'express'
import UserService from './user.service'

const userRouter = Router()

userRouter.get('/userInfo', UserService.getUserInfo)

export { userRouter }
