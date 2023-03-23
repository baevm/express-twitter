import { Router } from 'express'

const followRouter = Router()

followRouter.post('/follow', (req, res) => {
  res.send('Not implemented')
})

followRouter.post('/unfollow', (req, res) => {
  res.send('Not implemented')
})

export { followRouter }
