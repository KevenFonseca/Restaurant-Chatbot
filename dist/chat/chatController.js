import getOrCreateSession from '../service/sessionService.js';
import stateRouter from '../chat/stateRouter.js';
import { ChatState } from './chatState.js';
const chatController = async (req, res) => {
    try {
        const deviceId = req.deviceId;
        if (!deviceId) {
            return res.status(400).json({ error: 'DeviceId missing' });
        }
        const input = req.body?.message?.trim() || '';
        const session = await getOrCreateSession(deviceId);
        console.log(session.currentState);
        if (!input && session.currentState !== ChatState.START) {
            return res.status(400).json({ error: 'Message is required' });
        }
        const { reply, updatedSession } = await stateRouter(session.currentState, { input, session });
        // Save session updates
        await updatedSession.save();
        console.log(session.currentState);
        // Send response
        res.json({
            // deviceId: updatedSession.deviceId,
            // currentState: updatedSession.currentState,
            replyMessage: reply
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
export default chatController;
