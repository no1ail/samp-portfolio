const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from current directory
app.use(express.static(path.join(__dirname)));

// State
let viewerCount = 0;
let messages = []; // Array of { id, author, text, timestamp }
const MESSAGE_EXPIRY_MS = 60 * 60 * 1000; // 1 hour

// Helper to clean old messages
function cleanOldMessages() {
    const now = Date.now();
    const initialLength = messages.length;
    messages = messages.filter(msg => (now - msg.timestamp) < MESSAGE_EXPIRY_MS);
    if (messages.length < initialLength) {
        // Broadcast the updated messages to all clients
        io.emit('chat history', messages);
    }
}

// Run cleanup every minute
setInterval(cleanOldMessages, 60 * 1000);

io.on('connection', (socket) => {
    // Increase viewer count
    viewerCount++;
    io.emit('viewer count update', viewerCount);

    // Send chat history to new connection
    socket.emit('chat history', messages);

    // Listen for new messages
    socket.on('chat message', (msgData) => {
        const message = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
            author: msgData.author || 'Guest',
            text: msgData.text,
            timestamp: Date.now()
        };
        messages.push(message);
        
        // Broadcast to everyone
        io.emit('chat message', message);
    });

    socket.on('disconnect', () => {
        viewerCount = Math.max(0, viewerCount - 1);
        io.emit('viewer count update', viewerCount);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
