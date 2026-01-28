import { ChatResponse } from '../../types/chatTypes.js'
import Order from '../../models/orderModel.js'
import { ChatState } from '../chatState.js'
import handleStart from './startHandler.js'

const handleCheckout = async ({ session }: {session: any}): Promise<ChatResponse> => {
    const lastOrder = await Order.findOne({ sessionId: session._id })
        .sort({ createdAt: -1 })

    if (!lastOrder) {
        session.currentState = ChatState.START
        return {
            reply: 'No order to place, Returning to main menu',
            updatedSession: session
        }
    }

    if (lastOrder.status === 'confirmed') {
        return {
            reply: 'Your order has already been confirmed. Proceeding to payment.',
            updatedSession: session
        }
    }

    lastOrder.status = 'confirmed'
    await lastOrder.save()

    session.temporaryOrder = []
    session.currentState = ChatState.START
    
    const startResponse = await handleStart({ session })
    
    return {
        reply: `Order confirmed!\nTotal: $${lastOrder.totalPrice}.\n` + startResponse.reply,
        updatedSession: startResponse.updatedSession
    }
}

export default handleCheckout