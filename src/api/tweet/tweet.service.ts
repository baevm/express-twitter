import prisma from '@api/prisma/prisma.service'
import { HttpError } from '@api/utils/HTTPError'
import { HttpStatus } from '@api/utils/HTTPStatus'
import { NewTweetDto } from './newTweet.dto'

const postTweet = async (userId: string, newTweet: NewTweetDto) => {
  return prisma.tweet.create({
    data: {
      authorId: userId,
      text: newTweet.text,
      type: newTweet.type,
      tweetParentId: newTweet.parentId,
    },
  })
}

const getTweet = async (tweetId: string) => {
  const tweet = await prisma.tweet.findUnique({
    where: {
      id: tweetId,
    },
  })

  if (!tweet) {
    throw new HttpError(HttpStatus.NOT_FOUND, 'Tweet not found')
  }

  return tweet
}

const deleteTweet = async (userId: string, tweetId: string) => {
  return prisma.tweet
    .delete({
      where: {
        id: tweetId,
      },
    })
    .catch(() => {
      throw new HttpError(HttpStatus.INTERNAL_SERVER, 'Deleting tweet went wrong')
    })
}

const like = async (userId: string, tweetId: string) => {
  return prisma.tweetLike.create({
    data: {
      userId,
      tweetId,
    },
  })
}

const unlike = async (userId: string, tweetId: string) => {
  return prisma.tweetLike.findUnique({
    where: {
      tweetId_userId: {
        tweetId,
        userId,
      },
    },
  })
}

export default { postTweet, getTweet, deleteTweet, like, unlike }
