import { AtGuard } from '@api/auth/at.guard'
import { HttpStatus } from '@api/utils/HTTPStatus'
import { Router } from 'express'
import FollowService from './follow.service'

const followRouter = Router()

followRouter.use(AtGuard)

followRouter.post('/create', async (req, res, next) => {
  try {
    const body = req.body
    const user = req.user
    const data = await FollowService.follow(user.sub, body.followerId)
    return res.status(HttpStatus.OK).send({ message: 'ok' })
  } catch (error) {
    next(error)
  }
})

followRouter.post('/destroy', async (req, res, next) => {
  try {
    const body = req.body
    const user = req.user
    const data = await FollowService.unfollow(user.sub, body.followerId)
    return res.status(HttpStatus.OK).send({ message: 'ok' })
  } catch (error) {
    next(error)
  }
})

export { followRouter }
