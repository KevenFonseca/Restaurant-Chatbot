import { ChatState } from './chatState'
import handleStart from './handler/startHandler'
import handleMenu from './handler/menuHandler'
import handleOrdering from './handler/orderingHandler'
import handleCheckout from './Handler/checkoutHandler'

const stateRouter = async (state: String, payload: any) => {
    switch (state) {
        case ChatState.START:
            // Handle START state
            return handleStart(payload)

        case ChatState.MENU:
            // Handle MENU state
            return handleMenu(payload)

        case ChatState.ORDERING:
            // Handle ORDERING state
            return handleOrdering(payload)

        case ChatState.CHECKOUT:
            // Handle CHECKOUT state
            return handleCheckout(payload)

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
            throw new Error('Invalid chat state')
    }
}

export default stateRouter