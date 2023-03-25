import prisma from '@api/prisma/prisma.service'

const getUserInfo = async (username: string) => {
  return prisma.user.findUnique({
    where: {
      username,
    },
  })
}

const findUserByUsername = (username: string) => {
  return prisma.user.findUnique({
    where: {
      username,
    },
  })
}

const createUser = (user: { username: string; password: string }) => {
  return prisma.user.create({
    data: {
      username: user.username,
      password: user.password,
      tweetsCount: 0,
    },
  })
}

export default { getUserInfo, findUserByUsername, createUser }
