const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve static files from the "public" directory
app.use(express.static('public'));

// Listen for socket connections
io.on('connection', socket => {
    console.log('A user connected');

    // Listen for chat messages from clients
    socket.on('chatMessage', message => {
        // Broadcast the message to all connected clients
        io.emit('chatMessage', message);
    });

    // Listen for disconnect event
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
