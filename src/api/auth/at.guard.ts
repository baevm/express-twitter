import { HttpError } from '@api/utils/HTTPError'
import { HttpStatus } from '@api/utils/HTTPStatus'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { JwtPayload } from 'types/types'

export const AtGuard = (req: Request, res: Response, next: NextFunction) => {
  const at = req.cookies['access_token']
  if (!at) {
    throw new HttpError(HttpStatus.Unauthorized, 'No access token')
  }
  const user = jwt.decode(at) as JwtPayload

  if (!user) {
    throw new HttpError(HttpStatus.Unauthorized, 'No access token')
  }

  req.user = user
  next()
}
