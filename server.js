
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from 'public' directory
app.use(express.static('public'));

// When a user connects to the WebSocket
io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for chat messages
    socket.on('chat message', (msg) => {
        console.log('Message received: ' + msg);
        // Broadcast message to all clients
        io.emit('chat message', msg);
    });

    // When a user disconnects
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Set the port for the server
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});