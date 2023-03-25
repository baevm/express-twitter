import prisma from '@api/prisma/prisma.service'
import { HttpError } from '@api/utils/HTTPError'
import { HttpStatus } from '@api/utils/HTTPStatus'

const follow = async (userId: string, followerId: string) => {
  const follower = await prisma.user.findUnique({
    where: {
      id: followerId,
    },
  })

  if (!follower) {
    throw new HttpError(HttpStatus.BAD_REQUEST, 'User not found.')
  }

  const newFollow = await prisma.follower
    .create({
      data: {
        userId,
        followingId: followerId,
      },
    })
    .catch(() => {
      throw new HttpError(HttpStatus.BAD_REQUEST, 'You already following this user.')
    })

  return newFollow
}

const unfollow = async (followeeId: string, followerId: string) => {
  return 'not implemented'
}

export default { follow, unfollow }
