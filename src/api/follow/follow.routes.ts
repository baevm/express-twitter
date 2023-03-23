import { Router } from 'express'
import FollowController from './follow.controller'

const followRouter = Router()

followRouter.post('/follow', FollowController.follow)

followRouter.post('/unfollow', FollowController.unfollow)

export { followRouter }
