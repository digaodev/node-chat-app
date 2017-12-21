const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const publicDir = path.join(__dirname, '../public');
app.use(express.static(publicDir));

io.on('connection', socket => {
  console.log('new user connected');

  // send this message to the new connected socket
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat'));

  // broadcast this message to everyone in the chat but the sender
  socket.broadcast.emit(
    'newMessage',
    generateMessage('Admin', 'New user has joined the chat')
  );

  socket.on('createMessage', (message, callback) => {
    // broadcast this message to everyone in the chat including the sender
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });

  socket.on('createLocationMessage', coords => {
    io.emit(
      'newLocationMessage',
      generateLocationMessage('Admin', coords.latitude, coords.longitude)
    );
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.get('*', (req, res) => {
  res.sendFile('index.html', {
    root: publicDir
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`API running on localhost:${port}`));
