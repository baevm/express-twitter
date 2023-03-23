import { Request, Response } from 'express'

const postTweet = (req: Request, res: Response) => {
  return 'not implemented'
}

const getTweet = (req: Request, res: Response) => {
  return 'not implemented'
}

const deleteTweet = (req: Request, res: Response) => {
  return 'not implemented'
}

const like = (req: Request, res: Response) => {
  res.send('TEST')
}

const unlike = (req: Request, res: Response) => {
  return 'not implemented'
}

export default { postTweet, getTweet, deleteTweet, like, unlike }
