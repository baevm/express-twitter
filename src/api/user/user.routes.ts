import { AtGuard } from '@api/auth/at.guard'
import { HttpStatus } from '@api/utils/HTTPStatus'
import { Router } from 'express'
import UserService from './user.service'

const userRouter = Router()

userRouter.get('/userByUsername', AtGuard, async (req, res, next) => {
  try {
    const body = req.body
    const user = await UserService.getUserInfo(body.username)
    return res.status(HttpStatus.OK).send({ user })
  } catch (error) {
    next(error)
  }
})

export { userRouter }
