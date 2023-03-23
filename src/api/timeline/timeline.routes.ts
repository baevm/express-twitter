import { Router } from 'express'
import TimelineController from './timeline.controller'

const timelineRouter = Router()

timelineRouter.get('/getHomeTimeline', TimelineController.getHomeTimeline)

timelineRouter.get('/getUserTimeline', TimelineController.getUserTimeline)

export { timelineRouter }
