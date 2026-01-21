import { Request, Response } from 'express'
import getOrCreateSession from './sessionService'
import { ChatState } from './chatState'
import { getMenuItems } from '../utils/getMenuItems'
import MenuItem from '../models/menuItemModel'
import Order from '../models/orderModel'
import selectMenuItem from '../utils/selectMenuItems'

const chatController = async (req: Request, res: Response) => {
    try {
        const deviceId = req.deviceId
        if (!deviceId) throw new Error("DeviceId missing")

        const input = req.body?.message?.trim()
        if (!input) {
            return res.status(400).json({error: 'Message is required'})
        }
            
        const session = await getOrCreateSession(deviceId)
        const menu = await getMenuItems()

        let replyMessage: string

        // STATE HANDLING
        // ________________________________________________
        // START STATE
        if (session.currentState === ChatState.START) {
            session.currentState = ChatState.MENU
            replyMessage = menu
                .map((item) => `${item.id}. ${item.name} - $${item.price}`)
                .join('\n')
        }

        // ________________________________________________
        // MENU STATE
        else if (session.currentState === ChatState.MENU) {
            const result = selectMenuItem(input, menu, session, ChatState.ORDERING, true)
            replyMessage = result.replyMessage
        }

        // ________________________________________________
        //  ORDERING STATE
        else if (session.currentState === ChatState.ORDERING) {
            // Complete Order
            if (input === '0') {
                const totalPrice = await Promise.all(
                    session.temporaryOrder.map(async (item: any) => {
                        const menuItem = await MenuItem.findById(item.menuItemId)
                        return menuItem ? menuItem.price * item.quantity : 0
                    })
                ).then(prices => prices.reduce((a, b) => a + b, 0))

                await Order.create({
                    sessionId: session._id,
                    status: 'pending',
                    items: session.temporaryOrder,
                    totalPrice: totalPrice
                })

                session.temporaryOrder = []
                session.currentState = ChatState.CHECKOUT

                replyMessage = 'Order completed! Thank you for your order.'

            } else {
                const result = selectMenuItem(input, menu, session, ChatState.ORDERING, false)
                replyMessage = result.replyMessage
            }  
        }         
        
        // _______________________________________________
        // CHECKOUT STATE
        else if (session.currentState === ChatState.CHECKOUT) {
            replyMessage = 'Your order is being processed. Thank you!'
        }

        // ________________________________________________
        // FALLBACK
        else {
            replyMessage = 'Invalid State. Restart the chat.'
        }


        // Save session updates
        await session.save()

        // Send response
        res.json({
            deviceId: session.deviceId,
            currentState: session.currentState,
            reply: replyMessage
        })

    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export default chatController