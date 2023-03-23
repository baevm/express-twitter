import { Router } from 'express'
import TweetService from './tweet.service'

const tweetRouter = Router()

tweetRouter.post('/postTweet', TweetService.postTweet)

tweetRouter.get('/getTweet', TweetService.getTweet)

tweetRouter.post('/deleteTweet', TweetService.deleteTweet)

tweetRouter.post('/like', TweetService.like)

tweetRouter.post('/unlike', TweetService.unlike)

export { tweetRouter }
