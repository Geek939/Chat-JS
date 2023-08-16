const socket = io();

const chatMessages = document.getElementById('chat-messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message.trim() !== '') {
        socket.emit('chatMessage', message);
        messageInput.value = '';
    }
});


socket.on('chatMessage', message => {
    const messageElement = document.createElement('p');
    messageElement.innerText = message;
    chatMessages.appendChild(messageElement);
});