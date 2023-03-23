import { Router } from 'express'
import TweetController from './tweet.controller'

const tweetRouter = Router()

tweetRouter.post('/postTweet', TweetController.postTweet)

tweetRouter.get('/getTweet', TweetController.getTweet)

tweetRouter.post('/deleteTweet', TweetController.deleteTweet)

tweetRouter.post('/like', TweetController.like)

tweetRouter.post('/unlike', TweetController.unlike)

export { tweetRouter }
