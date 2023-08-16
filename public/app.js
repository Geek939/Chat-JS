
const socket = io();



const chatMessages = document.getElementById('chat-messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');


const room = prompt('Enter room name:'); 

socket.emit('joinRoom', room);


sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message.trim() !== '') {
        socket.emit('chatMessage', { room, message });
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
    messageElement.innerText = `[${username}] ${message}`;
    chatMessages.appendChild(messageElement);
})