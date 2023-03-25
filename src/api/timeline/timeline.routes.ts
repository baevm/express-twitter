import { AtGuard } from '@api/auth/at.guard'
import { HttpStatus } from '@api/utils/HTTPStatus'
import { Router } from 'express'
import { GetHomeTimelineDto, GetUserTimelineDto } from './timeline.dto'
import TimelineService from './timeline.service'

const timelineRouter = Router()

timelineRouter.get('/getHomeTimeline', AtGuard, async (req, res, next) => {
  try {
    const body: GetHomeTimelineDto = req.body
    const user = req.user
    const timeline = await TimelineService.getHomeTimeline(user.sub, body)
    return res.status(HttpStatus.OK).send({ timeline })
  } catch (error) {
    next(error)
  }
})

timelineRouter.get('/getUserTimeline', AtGuard, async (req, res, next) => {
  try {
    const body: GetUserTimelineDto = req.body
    const timeline = await TimelineService.getUserTimeline(body)
    return res.status(HttpStatus.OK).send({ timeline })
  } catch (error) {
    next(error)
  }
})

export { timelineRouter }
