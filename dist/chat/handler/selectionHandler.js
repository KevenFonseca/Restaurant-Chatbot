import { ChatState } from '../chatState.js';
import currentOrderHandler from './currentOrderHandler.js';
import orderHistoryHandler from './orderHistoryHandler.js';
import handleCheckout from './checkoutHandler.js';
import cancelOrderHandler from './cancelOrderHandler.js';
import { showMenuItems } from '../../utils/showMenuItems.js';
const handleSelection = async ({ input, session }) => {
    switch (input) {
        case '1':
            // Show menu
            return showMenuItems({ session });
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
            return {
                reply: 'Select one of the options',
                updatedSession: session
            };
    }
};
export default handleSelection;
