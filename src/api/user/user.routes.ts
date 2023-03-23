import { Router } from 'express'

const userRouter = Router()

userRouter.get('/userInfo', (req, res) => {
  res.send('Not implemented')
})

export { userRouter }
