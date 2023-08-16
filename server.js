const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);


app.use(express.static('public'));


io.on('connection', socket => {
    console.log('A user connected');


    socket.on('joinRoom', room => {
        socket.join(room);
        console.log(`User joined room: ${room}`);
    });


    socket.on('chatMessage', data => {
        const { room, message } = data;
        const socketsInRoom = io.sockets.adapter.rooms.get(room);
        socketsInRoom.forEach(socketId => {
            io.to(socketId).emit('chatMessage', { username: room, message });
        });
    });
   
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
