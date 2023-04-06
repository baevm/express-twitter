import { NextFunction, Request, Response } from 'express'
import { instanceToPlain, plainToInstance } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'
import { HttpError } from '@api/utils/HTTPError'
import { HttpStatus } from '@api/utils/HTTPStatus'

export const validationMiddleware = (type: any, skipMissingProperties = false) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dto = plainToInstance(type, req.body)
    const errors = await validate(dto, { skipMissingProperties })

    if (errors.length > 0) {
      const dtoErrors = errors.map((error: ValidationError) => ({
        field: error.property,
        error: (Object as any).values(error.constraints).join('. '),
      }))
      next(new HttpError(HttpStatus.BAD_REQUEST, dtoErrors))
    } else {
      instanceToPlain(dto)
      req.body = dto
      next()
    }
  }
}
