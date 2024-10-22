// server.js
const express = require('express');
const next = require('next');
const http = require('http');
const { Server } = require('socket.io');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

(async () => {
  console.log('Starting server...');
  try {
    await app.prepare();
    const server = express();

    const httpServer = http.createServer(server);
    const io = new Server(httpServer);

    // Socket.io server-side logic
    io.on('connection', (socket) => {
      console.log('A user connected:', socket.id);

      socket.on('message', (msg) => {
        console.log('Message received:', msg);
        // Broadcast the message to all connected clients
        io.emit('message', msg);
      });

      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
      });
    });

    // Handle Next.js routing
    server.all('*', (req, res) => handle(req, res));

    httpServer.listen(port, () => {
      console.log(`> Server listening on http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
})();