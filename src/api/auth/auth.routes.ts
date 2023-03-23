import { Router } from 'express'

const authRouter = Router()

authRouter.post('/signup', (req, res) => {
  res.send('Not implemented')
})

authRouter.post('/login', (req, res) => {
  res.send('Not implemented')
})

authRouter.post('/refreshToken', (req, res) => {
  res.send('Not implemented')
})

authRouter.post('/logout', (req, res) => {
  res.send('Not implemented')
})

export { authRouter }
