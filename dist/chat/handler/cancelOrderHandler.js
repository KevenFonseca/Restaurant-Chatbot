import { ChatState } from '../chatState';
import Order from '../../models/orderModel';
const cancelOrderHandler = async ({ session }) => {
    if (!session.temporaryOrder || session.temporaryOrder.length === 0) {
        return {
            reply: 'You have no current order to cancel',
            updatedSession: session
        };
    }
    const order = await Order.findOne({
        sessionId: session._id,
        status: 'pending',
    }).sort({ createdAt: -1 });
    if (order) {
        order.status = 'canceled';
        await order.save();
    }
    session.temporaryOrder = [];
    session.currentState = ChatState.MENU;
    return {
        reply: 'Your current order has been canceled',
        updatedSession: session
    };
};
export default cancelOrderHandler;
