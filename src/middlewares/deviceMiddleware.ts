import { Request, Response, NextFunction } from 'express'
import {v4 as uuid } from 'uuid'

const devideMiddleware = (req: Request, res: Response, next: NextFunction) => {
    let deviceId = req.cookies.deviceId

    if (!deviceId) {
        deviceId = uuid()
        res.cookie('deviceId', deviceId, {
            httpOnly: true,
            sameSite: 'lax'
        })
    }

    req.deviceId = deviceId
    next()
}

export default devideMiddleware