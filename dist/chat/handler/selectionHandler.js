import { ChatState } from '../chatState';
import currentOrderHandler from './currentOrderHandler';
import orderHistoryHandler from './orderHistoryHandler';
import handleCheckout from './checkoutHandler';
import cancelOrderHandler from './cancelOrderHandler';
import { showMenuItems } from '../../utils/showMenuItems';
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
