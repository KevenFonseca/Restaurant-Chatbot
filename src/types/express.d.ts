import 'express'

declare global {
  namespace Express {
    interface Request {
      deviceId?: string
    }
  }
}

export {}