import { ChatState } from '../chatState.js'
import MenuItem from '../../models/menuItemModel.js'
import Order from '../../models/orderModel.js'
import { getMenuItems } from '../../utils/getMenuItems.js'
import selectMenuItem from '../../utils/selectMenuItems.js'
import { ChatResponse } from '../../types/chatTypes.js'
import handleStart from './startHandler.js'

const handleOrdering = async ({ input, session }: {input: string, session: any}): Promise<ChatResponse> => {
    if (!session.temporaryOrder) session.temporaryOrder = []
    
    // Commit order and move to checkout
    if (input === '0') {
        if (session.temporaryOrder.length === 0) {
            session.currentState = ChatState.START
            return {
                reply: 'No order to place. Returning to main menu',
                updatedSession: session
            }
        }
        
        const totalPrice = (
            await Promise.all(
                session.temporaryOrder.map(async (item: any) => {
                    const menuItem = await MenuItem.findById(item.menuItemId)
                    return menuItem ? menuItem.price * item.quantity : 0
                })
            )
        ).reduce((a, b) => a + b, 0)
        
        await Order.create({
            sessionId: session._id,
            status: 'pending',
            items: session.temporaryOrder,
            totalPrice
        })

        session.currentState = ChatState.START

        const startResponse = await handleStart({session})

        return {
            reply: 'Order completed!\n' + startResponse.reply,
            updatedSession: startResponse.updatedSession
        }
    }

    // Add items to order
    const menu = await getMenuItems()

    const result: ChatResponse = await selectMenuItem(
        input,
        menu,
        session,
        ChatState.ORDERING,
        session.temporaryOrder.length === 0 // first selection
    )

    return result
}

export default handleOrdering