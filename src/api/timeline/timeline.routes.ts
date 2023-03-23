import { Router } from 'express'
import TimelineService from './timeline.service'

const timelineRouter = Router()

timelineRouter.get('/getHomeTimeline', TimelineService.getHomeTimeline)

timelineRouter.get('/getUserTimeline', TimelineService.getUserTimeline)

export { timelineRouter }
