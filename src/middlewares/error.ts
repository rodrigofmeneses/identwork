import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'
import { ApiError } from '../shared/api-errors'


export const errorMiddleware = (
  error: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if (error instanceof ZodError) {
    return res.status(400).json(error.flatten())
  }

  const status = error.status ?? 500
  const message = error.status ? error.message : 'Internal Server Error'
  return res.status(status).json({ message: message })
}