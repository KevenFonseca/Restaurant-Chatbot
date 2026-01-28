import menuItemModel from "../models/menuItemModel"
import { ChatResponse } from "../types/chatTypes"
import { ChatState } from '../chat/chatState'

const showMenuItems = async ({ session }: {session: any}): Promise<ChatResponse> => {
    const menuItems = await menuItemModel.find({ isAvailable: true })

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