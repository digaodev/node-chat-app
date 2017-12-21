var socket = io();

socket.on('connect', function() {
  console.log('connected to the server');
});

socket.on('disconnect', function() {
  console.log('disconnected from the server');
});

socket.on('newMessage', function(newMessage) {
  // console.log('newMessage: ', newMessage);
  let li = $('<li></li>');
  li.text(`${newMessage.from} says: ${newMessage.text}`);

  $('#messages-panel').append(li);
});

// socket.emit(
//   'createMessage',
//   { from: 'Mike', text: 'My first chat message!' },
//   function(data) {
//     console.log(data);
//   }
// );

$('#message-form').on('submit', function(evt) {
  evt.preventDefault();

  socket.emit(
    'createMessage',
    { from: 'User', text: $('#message-input').val() },
    function(data) {
      console.log(data);
    }
  );
});
