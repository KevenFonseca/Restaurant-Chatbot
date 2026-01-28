import menuItemModel from "../models/menuItemModel.js"
import { ChatResponse } from "../types/chatTypes.js"
import { ChatState } from '../chat/chatState.js'

const showMenuItems = async ({ session }: {session: any}): Promise<ChatResponse> => {
    const menuItems = await menuItemModel
        .find({ isAvailable: true })
        .sort({ id: 1 })
    

    const menuList = menuItems
        .map((item: any) => `${item.id}. ${item.name} - $${item.price}`)
        .join('\n')

    const reply = `${menuList}\n\nPlace your order`

    session.currentState = ChatState.ORDERING

    return {
        reply,
        updatedSession: session
    }
}

export { showMenuItems }