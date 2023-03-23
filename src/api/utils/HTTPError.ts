import { HttpStatus } from './HTTPStatus'

type Status = (typeof HttpStatus)[keyof typeof HttpStatus]

export interface ErrorModel {
  status: Status
  message: string
}

export class HttpError extends Error {
  status: Status
  constructor(status: Status, message: string) {
    super(message)
    Error.captureStackTrace(this, this.constructor)
    this.status = status
  }
}
