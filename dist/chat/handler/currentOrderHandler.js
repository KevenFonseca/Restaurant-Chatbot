import MenuItem from '../../models/menuItemModel.js';
const currentOrderHandler = async ({ session }) => {
    if (!session.temporaryOrder)
        session.temporaryOrder = [];
    if (session.temporaryOrder.length === 0) {
        return {
            reply: 'Your current order is empty.',
            updatedSession: session
        };
    }
    const lines = await Promise.all(session.temporaryOrder.map(async (item) => {
        const menuItem = await MenuItem.findById(item.menuItemId);
        if (!menuItem)
            return null;
        return `${item.quantity} x ${menuItem.name} - $${(menuItem.price * item.quantity).toFixed(2)}`;
    }));
    return {
        reply: `Your current order:\n${lines.filter(Boolean).join('\n')}`,
        updatedSession: session
    };
};
export default currentOrderHandler;
