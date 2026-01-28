import sessionModel from '../models/sessionModel.js';
import { ChatState } from '../chat/chatState.js';
const getOrCreateSession = async (deviceId) => {
    let session = await sessionModel.findOne({ deviceId });
    if (!session) {
        session = new sessionModel({
            deviceId,
            currentState: ChatState.START
        });
        await session.save();
    }
    return session;
};
export default getOrCreateSession;
