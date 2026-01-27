const chatBox = document.getElementById('chat')
const form = document.getElementById('chat-form')
const input = document.getElementById('message')

// function to add message to chat
function addMessage(text, sender) {
    const div = document.createElement('div')
    div.classList.add('message', sender)

    text.split('\n').forEach(line => {
        const p = document.createElement('p')
        p.textContent = line
        div.appendChild(p)
    });

    chatBox.appendChild(div)
    chatBox.scrollTop = chatBox.scrollHeight
}

async function sendMessage(message) {
    try {
        const res = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        })

        const data = await res.json()

        if (!res.ok) {
            addMessage(data.error || 'Invalid request', 'bot')
        } else {
            addMessage(data.replyMessage, 'bot')
        }

    } catch(err) {
        console.error(err)
        addMessage('Server error. Try again', 'bot')
    }
}

window.addEventListener('DOMContentLoaded', () => {
    sendMessage('') // send empty string whem page is loaded
})

form.addEventListener('submit', async (event) => {
    event.preventDefault()

    const message = input.value.trim()

    if (!message) return

    addMessage(message, 'user')
    input.value = ''

    sendMessage(message)
})