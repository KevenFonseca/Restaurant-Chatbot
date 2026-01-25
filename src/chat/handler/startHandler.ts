import { ChatState} from '../chatState'
import getMenuItems from '../../utils/getMenuItems'
import { ChatResponse } from '../../types/chatTypes'

const HandleStart = async ({ session }: {session: any}): Promise<ChatResponse> => {
    const menu = await getMenuItems()

    session.currentState = ChatState.MENU

    const replyMessage = menu
        .map((item) => `${item.id}. ${item.name} - $${item.price}`)
        .join('\n')

    return {
        reply: replyMessage,
        updatedSession: session
    }
}

export default HandleStart