const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const publicDir = path.join(__dirname, '../public');
app.use(express.static(publicDir));

io.on('connection', (socket) => {
  console.log('new user connected');

  socket.on('createMessage', (message) => {
    console.log('incoming message: ', message);

    message.createdAt = new Date();

    io.emit('newMessage', {
      for: 'everyone',
      message: message
    });
    console.log('broadcasting message: ', message);
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
server.listen(port, () => console.log(`API running on localhost:${ port }`));