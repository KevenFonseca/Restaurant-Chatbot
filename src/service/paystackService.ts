import Paystack from 'paystack-api'
import Order from '../models/orderModel.js'
import Payment from '../models/paymentModel.js'
import dotenv from 'dotenv'

dotenv.config()

// Initialize Paystack
const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY!)

// Initialize Transaction
const initializeTransaction = async (orderId: string, email: string, amount: number) => {
    const response = await paystack.transaction.initialize({
        email,
        amount,
        metadata: { orderId }
    })

    return response.data
}

// Verify Transaction
const verifyTransaction = async (reference: string) => {
    const response = await paystack.transaction.verify({ reference })
    return response.data
}

// Update order payment in the database
const updateOrderPaymentStatus = async (orderId: string, reference: string) => {
    const order = await Order.findById(orderId)
    if (!order) throw new Error('Order not found')

    order.status = 'completed'
    await order.save()

    const payment = await Payment.create({
        orderId: order._id,
        reference,
        status: 'success'
    })

    return payment
}

export {
    initializeTransaction,
    verifyTransaction,
    updateOrderPaymentStatus
}