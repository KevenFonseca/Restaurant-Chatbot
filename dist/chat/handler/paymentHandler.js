import { ChatState } from '../chatState.js';
import { initializeTransaction, verifyTransaction, updateOrderPaymentStatus } from '../../service/paystackService.js';
import Order from '../../models/orderModel.js';
import Payment from '../../models/paymentModel.js';
import dotenv from 'dotenv';
dotenv.config();
const email = process.env.EMAIL;
if (!email)
    throw new Error('EMAIL env variable not set');
const paystackPaymentHandler = async ({ session }) => {
    if (!session.temporaryOrder || session.temporaryOrder.length === 0) {
        return {
            reply: 'No order to place',
            updatedSession: session
        };
    }
    const lastOrder = await Order.findOne({ sessionId: session._id }).sort({ createdAt: -1 });
    if (!lastOrder) {
        return {
            reply: 'Order not found',
            updatedSession: session
        };
    }
    session.currentOrderId = lastOrder._id;
    const paystackResponse = await initializeTransaction(lastOrder._id.toString(), email, lastOrder.totalPrice);
    return {
        reply: `Proceed to payment: ${paystackResponse.data.authorization_url}`,
        updatedSession: session
    };
};
const verifyPaystackPaymentHandler = async ({ session, reference }) => {
    const orderId = session.currentOrderId;
    if (!orderId) {
        return {
            reply: 'No order in progress',
            updatedSession: session
        };
    }
    const verification = await verifyTransaction(reference);
    if (verification.data.status === 'success') {
        await updateOrderPaymentStatus(orderId.toString(), reference);
        session.temporaryOrder = [];
        session.currentState = ChatState.COMPLETED;
        return {
            reply: 'Payment successfully! Your order has been placed',
            updatedSession: session
        };
    }
    await Payment.create({
        orderId,
        reference,
        status: 'failed'
    });
    session.currentState = ChatState.ORDERING;
    return {
        reply: 'Payment failed. Please try again',
        updatedSession: session
    };
};
export { paystackPaymentHandler, verifyPaystackPaymentHandler };
