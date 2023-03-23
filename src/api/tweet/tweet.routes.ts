import { Router } from 'express'

const tweetRouter = Router()

tweetRouter.post('/postTweet', (req, res) => {
  res.send('Not implemented')
})

tweetRouter.get('/getTweet', (req, res) => {
  res.send('Not implemented')
})

tweetRouter.post('/deleteTweet', (req, res) => {
  res.send('Not implemented')
})

tweetRouter.post('/like', (req, res) => {
  res.send('Not implemented')
})

tweetRouter.post('/unlike', (req, res) => {
  res.send('Not implemented')
})

export { tweetRouter }
