import { Request, Response } from 'express'
import getOrCreateSession from './sessionService'

const chatController = async (req: Request, res: Response) => {
    try {
        if (!req.deviceId) throw new Error("DeviceId missing")
            
        const deviceId = req.deviceId
        const session = await getOrCreateSession(deviceId)

        // Here you would typically process the user's message and update the session state accordingly.
        
        res.json({
            deviceId: session.deviceId,
            currentState: session.currentState
        })
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export default chatController