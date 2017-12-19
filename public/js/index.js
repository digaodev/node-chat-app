var socket = io();

socket.on('connect', function () {
  console.log('connected to the server');

  socket.emit('createMessage', {
    from: 'mike',
    text: 'Hey'
  });
});

socket.on('disconnect', function () {
  console.log('disconnected from the server');
});

socket.on('newMessage', function (newMessage) {
  console.log('broadcasted newMessage: ', newMessage);
});