import { ErrorModel } from '@api/utils/HTTPError'
import { Request, Response } from 'express'

export const errorHandler = (error: ErrorModel, req: Request, res: Response, next) => {
  if (error.status) {
    return res.status(error.status).send({ error: error.message, status: error.status })
  }

  return res.status(500).send({ message: 'Server error.' })
}
