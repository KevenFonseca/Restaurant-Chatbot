import { ChatState } from './chatState.js';
import handleStart from './handler/startHandler.js';
import handleSelection from './handler/selectionHandler.js';
import handleOrdering from './handler/orderingHandler.js';
import handleCheckout from './handler/checkoutHandler.js';
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
