const socket = io();

const chatMessages = document.getElementById('chat-messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

const room = prompt('Ingresa el nombre de la sala:');
const username = prompt('Ingresa tu nombre de usuario:'); 

socket.emit('joinRoom', room);

sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message.trim() !== '') {
        socket.emit('chatMessage', { room, message, username }); 
        messageInput.value = '';
    }
});

messageInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendButton.click();
    }
});

socket.on('chatMessage', data => {
    const messageElement = document.createElement('p');
    const { username, message } = data;
    messageElement.innerHTML = `<span ${username}">[${username}]</span> ${message}`;
    chatMessages.appendChild(messageElement);
});
