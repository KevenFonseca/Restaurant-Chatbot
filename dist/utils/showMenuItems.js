import menuItemModel from "../models/menuItemModel.js";
import { ChatState } from '../chat/chatState.js';
const showMenuItems = async ({ session }) => {
    const menuItems = await menuItemModel.find({ isAvailable: true });
    const menuList = menuItems
        .map((item) => `${item.id}. ${item.name} - $${item.price}`)
        .join('\n');
    const reply = `${menuList}\n\nPlace your order`;
    session.currentState = ChatState.ORDERING;
    return {
        reply,
        updatedSession: session
    };
};
export { showMenuItems };
