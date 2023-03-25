import prisma from '@api/prisma/prisma.service'
import { GetHomeTimelineDto, GetUserTimelineDto } from './timeline.dto'

const getHomeTimeline = async (userId: string, data: GetHomeTimelineDto) => {
  // Get tweets, likes, retweets userId is following
  return prisma.tweet.findMany({
    where: {
      OR: [
        {
          author: {
            followers: {
              some: {
                userId,
              },
            },
          },
        },
        {
          retweets: {
            some: {
              user: {
                followers: {
                  some: {
                    userId,
                  },
                },
              },
            },
          },
        },
        {
          likes: {
            some: {
              user: {
                followers: {
                  some: {
                    userId,
                  },
                },
              },
            },
          },
        },
      ],
    },
    take: data.take,
    cursor: {
      id: data.cursor,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

const getUserTimeline = async (data: GetUserTimelineDto) => {
  return prisma.tweet.findMany({
    where: {
      authorId: data.userId,
    },
    take: data.take,
    cursor: {
      id: data.cursor,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export default { getHomeTimeline, getUserTimeline }
