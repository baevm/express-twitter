import { AtGuard } from '@api/auth/at.guard'
import { HttpStatus } from '@api/utils/HTTPStatus'
import { Router } from 'express'
import { NewTweetDto } from './newTweet.dto'
import TweetService from './tweet.service'

const tweetRouter = Router()

tweetRouter.get('/getTweet', async (req, res, next) => {
  try {
    const body = req.body
    const tweet = await TweetService.getTweet(body.tweetId)
    return res.status(HttpStatus.OK).send({ tweet })
  } catch (error) {
    next(error)
  }
})

tweetRouter.post('/postTweet', AtGuard, async (req, res, next) => {
  try {
    const body: NewTweetDto = req.body
    const user = req.user
    const newTweet = await TweetService.postTweet(user.sub, body)
    return res.status(HttpStatus.OK).send({ newTweet })
  } catch (error) {
    next(error)
  }
})

tweetRouter.post('/deleteTweet', AtGuard, async (req, res, next) => {
  try {
    const body = req.body
    const user = req.user
    const tweet = await TweetService.deleteTweet(user.sub, body.tweetId)
    return res.status(HttpStatus.OK).send({ tweet })
  } catch (error) {
    next(error)
  }
})

tweetRouter.post('/like', AtGuard, async (req, res, next) => {
  try {
    const body = req.body
    const user = req.user
    const tweet = await TweetService.like(user.sub, body.tweetId)
    return res.status(HttpStatus.OK).send({ tweet })
  } catch (error) {
    next(error)
  }
})

tweetRouter.post('/unlike', AtGuard, async (req, res, next) => {
  try {
    const body = req.body
    const user = req.user
    const tweet = await TweetService.unlike(user.sub, body.tweetIt)
    return res.status(HttpStatus.OK).send({ tweet })
  } catch (error) {
    next(error)
  }
})

export { tweetRouter }
