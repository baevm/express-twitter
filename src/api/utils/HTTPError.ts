import { HttpStatus } from './HTTPStatus'

type Status = (typeof HttpStatus)[keyof typeof HttpStatus]

export interface ErrorModel {
  status: Status
  message: any
}

export class HttpError extends Error {
  status: Status
  constructor(status: Status, message: any) {
    super(message)
    this.status = status
  }
}
