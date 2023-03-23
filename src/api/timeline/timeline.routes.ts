import { Router } from 'express'

const timelineRouter = Router()

timelineRouter.get('/getHomeTimeline', (req, res) => {
  res.send('Not implemented')
})

timelineRouter.get('/getUserTimeline', (req, res) => {
  res.send('Not implemented')
})

export { timelineRouter }
