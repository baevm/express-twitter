import { Router } from 'express'
import FollowService from './follow.service'

const followRouter = Router()

followRouter.post('/follow', FollowService.follow)

followRouter.post('/unfollow', FollowService.unfollow)

export { followRouter }
