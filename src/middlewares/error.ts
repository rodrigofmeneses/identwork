import { NextFunction, Request, Response } from 'express'
import { ApiError } from '../shared/api-errors'


export const errorMiddleware = (
  error: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error.status ?? 500
  const message = error.status ? error.message : 'Internal Server Error'
  return res.status(status).json({ message: message })
}