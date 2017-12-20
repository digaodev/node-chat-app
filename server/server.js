const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const publicDir = path.join(__dirname, '../public');
app.use(express.static(publicDir));

io.on('connection', socket => {
  console.log('new user connected');

  // send this message to the new connected socket
  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat',
    createdAt: new Date().getTime()
  });

  // broadcast this message to everyone in the chat
  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New user has joined the chat',
    createdAt: new Date().getTime()
  });

  socket.on('createMessage', message => {
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
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
