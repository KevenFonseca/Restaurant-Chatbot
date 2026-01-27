import { ChatResponse } from '../../types/chatTypes'
import Order from '../../models/orderModel'

const orderHistoryHandler = async ({ session }: {session: any}): Promise<ChatResponse> => {
    const orders = await Order.find({ sessionId: session._id })
        .sort({ createdAt: -1 })

    if (orders.length == 0) {
        return {
            reply: 'You have no past orders.',
            updatedSession: session
        }
    }

    const history = orders.map((order: any, index: number) => { 
        const dateStr = order.createdAt.toLocaleString()
        return `${index + 1}. Status: ${order.status}, Total: $${order.totalPrice.toFixed(2)}, Date: ${dateStr}`
    })

    return {
        reply: `Your order history:\n${history.join('\n')}`,
        updatedSession: session
    }
}


export default orderHistoryHandler