import { ChatState } from '../chatState';
import { getMenuItems } from '../../utils/getMenuItems';
import selectMenuItem from '../../utils/selectMenuItems';
import currentOrderHandler from './currentOrderHandler';
import orderHistoryHandler from './orderHistoryHandler';
import handleCheckout from './checkoutHandler';
import cancelOrderHandler from './cancelOrderHandler';
const handleMenu = async ({ input, session }) => {
    switch (input) {
        case '97':
            // View current order
            return currentOrderHandler({ session });
        case '98':
            // View order history
            return orderHistoryHandler({ session });
        case '99':
            // Proceed to checkout
            session.currentState = ChatState.CHECKOUT;
            return handleCheckout({ session });
        case '0':
            // Cancel order
            return cancelOrderHandler({ session });
        default:
            const menu = await getMenuItems();
            return selectMenuItem(input, menu, session, ChatState.ORDERING, true);
    }
};
export default handleMenu;
