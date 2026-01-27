import { ChatState } from './chatState';
import handleStart from './handler/startHandler';
import handleSelection from './handler/selectionHandler';
import handleOrdering from './handler/orderingHandler';
import handleCheckout from './handler/checkoutHandler';
const stateRouter = async (state, payload) => {
    switch (state) {
        case ChatState.START:
            // Handle START state
            return handleStart(payload);
        case ChatState.MENU:
            // Handle MENU state
            return handleSelection(payload);
        case ChatState.ORDERING:
            // Handle ORDERING state
            return handleOrdering(payload);
        case ChatState.CHECKOUT:
            // Handle CHECKOUT state
            return handleCheckout(payload);
        case ChatState.PAYMENT:
        // Handle PAYMENT state
        // return handlePayment(payload)
        case ChatState.COMPLETED:
        // Handle COMPLETED state
        // return handleCompleted(payload)
        case ChatState.CANCELLED:
        // Handle CANCELLED state
        // return handleCancelled(payload)
        default:
            return {
                reply: 'Invalid chat state',
                updatedSession: payload.session
            };
    }
};
export default stateRouter;
