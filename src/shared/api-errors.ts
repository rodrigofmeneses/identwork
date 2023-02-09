export class ApiError extends Error {
  /** Generic Error Handler to RestfulAPI
   *
   */
  readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

export class NotFoundError extends ApiError {
  /** Not Found Error
   *
   */
  constructor(message: string) {
    super(message, 404)
  }
}

export class BadRequestError extends ApiError {
  /** Not Found Error
   *
   */
  constructor(message: string) {
    super(message, 400)
  }
}

export class UnauthorizedError extends ApiError {
  /** Unauthorized Error
   *
   */
  constructor(message: string) {
    super(message, 401)
  }
}