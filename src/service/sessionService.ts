import sessionModel from '../models/sessionModel'
import { ChatState } from '../chat/chatState'

const getOrCreateSession = async (deviceId: string) => {
    let session = await sessionModel.findOne({ deviceId })

    if (!session) {
        session = new sessionModel({
            deviceId,
            currentState: ChatState.START
        })

        await session.save()
    }

    return session
}

export default getOrCreateSession