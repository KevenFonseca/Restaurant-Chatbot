import { ChatState} from '../chatState'
import { getMenuItems } from '../../utils/getMenuItems'
import { ChatResponse } from '../../types/chatTypes'

const handleStart = async ({ session }: {session: any}): Promise<ChatResponse> => {
    const replyMessage = [
        '1. Select 1 to Place an order',
        '2. Select 99 to checkout order',
        '3. Select 98 to see order history',
        '4. Select 97 to see current order',
        '5. Select 0 to cancel order',
        'Please select an option'
    ].join('\n')

    session.currentState = ChatState.MENU

    return {
        reply: replyMessage,
        updatedSession: session
    }
}

export default handleStart