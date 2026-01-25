import { ChatResponse } from '../../types/chatTypes'
import Order from '../../models/orderModel'
import { ChatState } from '../chatState'

const handleCheckout = async ({ session }: {session: any}): Promise<ChatResponse> => {
    const lastOrder = await Order.findOne({ sessionId: session._id })
        .sort({ createdAt: -1 })

    if (!lastOrder) {
        return {
            reply: 'No order to place',
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
    
    session.currentState = ChatState.PAYMENT

    return {
        reply: `Order confirmed!\nTotal: ${lastOrder.totalPrice}.\nProceeding to payment.`,
        updatedSession: session
    }
}

export default handleCheckout