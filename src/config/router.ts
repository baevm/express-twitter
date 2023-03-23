import { Router } from 'express'
import { followRouter } from '@api/follow/follow.routes'
import { timelineRouter } from '@api/timeline/timeline.routes'
import { tweetRouter } from '@api/tweet/tweet.routes'
import { userRouter } from '@api/user/user.routes'
import { authRouter } from '@api/auth/auth.routes'

const indexRouter = Router()

indexRouter.use('/auth', authRouter)
indexRouter.use('/follow', followRouter)
indexRouter.use('/timeline', timelineRouter)
indexRouter.use('/tweet', tweetRouter)
indexRouter.use('/user', userRouter)

export { indexRouter }
