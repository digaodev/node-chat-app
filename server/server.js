const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const publicDir = path.join(__dirname, '../public');
app.use(express.static(publicDir));

io.on('connection', socket => {
  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      callback('Name and Room Name are required.');
    }

    // join the user to a chat room
    socket.join(params.room);

    // send this message to the new connected socket
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat'));

    // broadcast this message to everyone in the chat but the sender
    socket.broadcast.to(params.room).emit(
      'newMessage',
      generateMessage('Admin', `${params.name} has joined the chat`)
    );

    callback();
  });

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
