import { ChatState } from '../chat/chatState'

const selectMenuItem = async (input: string, menu: any[], session: any, nextState: ChatState, isFirstSelection: boolean) => {  
    if (!/^\d+$/.test(input)) {
        return { 
            reply: 'Invalid input. Please enter a valid menu item number.',
            updatedSession: session
        }
    }

    const choice = Number(input)
    const selectItem = menu[choice - 1]

    if (!selectItem) {
        const errMessage = isFirstSelection
            ? 'Invalid choice. Please choose a valid menu item number from the menu.'
            : 'Invalid choice. Please choose a valid menu item number or 0 to complete your order.'
    
        return { 
            reply: errMessage,
            updatedSession: session
        }
    }

    if (!session.temporaryOrder) session.temporaryOrder = []

    session.temporaryOrder.push({
        menuItemId: selectItem._id,
        quantity: 1
    })

    session.currentState = nextState

    const confirmMessage = isFirstSelection
        ? `You have selected: ${selectItem.name}. You can select more items or enter 0 to complete your order.`
        : `Added ${selectItem.name} to your order. You can select more items or enter 0 to complete your order.`
    
    return { 
        reply: confirmMessage,
        updatedSession: session
    }
}

export default selectMenuItem