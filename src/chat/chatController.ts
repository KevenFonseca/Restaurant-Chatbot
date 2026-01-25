import { Request, Response } from 'express'
import getOrCreateSession from '../service/sessionService'
import stateRouter from '../chat/stateRouter'

const chatController = async (req: Request, res: Response) => {
    try {
        const deviceId = req.deviceId
        if (!deviceId) {
            return res.status(400).json({error: 'DeviceId missing'})
        }

        const input = req.body?.message?.trim()
        if (!input) {
            return res.status(400).json({error: 'Message is required'})
        }
            
        const session = await getOrCreateSession(deviceId)

        // const { reply, updatedSession } = await testFunction({session})
        const { reply, updatedSession } = await stateRouter(session.currentState, {input, session})
       
        // Save session updates
        await updatedSession.save()

        // Send response
        res.json({
            deviceId: updatedSession.deviceId,
            currentState: updatedSession.currentState,
            replyMessage: reply
        })

    } catch (err: any) {
        console.error(err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export default chatController