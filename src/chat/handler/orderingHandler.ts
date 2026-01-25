import { ChatState } from '../chatState'
import MenuItem from '../../models/menuItemModel'
import Order from '../../models/orderModel'
import getMenuItems from '../../utils/getMenuItems'
import selectMenuItem from '../../utils/selectMenuItems'
import { ChatResponse } from '../../types/chatTypes'

const handleOrdering = async ({ input, session }: {input: string, session: any}): Promise<ChatResponse> => {
    // Commit order and move to checkout
    if (input === '0') {

        if (!session.temporaryOrder || session.temporaryOrder.length === 0) {
            return {
                reply: 'No order to place',
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
            totalPrice: totalPrice
        })

        session.temporaryOrder = []
        session.currentState = ChatState.CHECKOUT

        return {
            reply: 'Order completed! Proceed to checkout',
            updatedSession: session
        }
    }

    // Add more items to order
    const menu = await getMenuItems()

    const result: ChatResponse = await selectMenuItem(
        input,
        menu,
        session,
        ChatState.ORDERING,
        false
    )

    return result
}

export default handleOrdering