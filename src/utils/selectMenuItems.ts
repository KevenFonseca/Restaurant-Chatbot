import { ChatState } from '../chat/chatState'

const selectMenuItem = (input: string, menu: any[], session: any, nextState: ChatState, isFirstSelection: boolean) => {  
    if (!/^\d+$/.test(input)) {
        return { 
            replyMessage: 'Invalid input. Please enter a valid menu item number.',
            isValid: false
        }
    }

    const choice = Number(input)
    const selectItem = menu[choice - 1]

    if (!selectItem) {
        const errMessage = isFirstSelection
            ? 'Invalid choice. Please choose a valid menu item number from the menu.'
            : 'Invalid choice. Please choose a valid menu item number or 0 to complete your order.'
    
        return { 
            replyMessage: errMessage,
            isValid: false
        }
    }

    session.temporaryOrder.push({
        menuItemId: selectItem._id,
        quantity: 1
    })

    session.currentState = nextState

    const confirmMessage = isFirstSelection
        ? `You have selected: ${selectItem.name}. You can select more items or enter 0 to complete your order.`
        : `Added another ${selectItem.name} to your order. You can select more items or enter 0 to complete your order.`
    
    return { 
        replyMessage: confirmMessage,
        isValid: true
    }
}

export default selectMenuItem