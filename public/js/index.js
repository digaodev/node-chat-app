var socket = io();

socket.on('connect', function() {
  console.log('connected to the server');
});

socket.on('disconnect', function() {
  console.log('disconnected from the server');
});

socket.on('newMessage', function(newMessage) {
  const formattedTime = moment(newMessage.createdAt).format('HH:mm');

  let li = $('<li></li>');
  li.text(`[${formattedTime}] ${newMessage.from} says: ${newMessage.text}`);

  $('#messages-panel').append(li);
});

socket.on('newLocationMessage', function(locationMessage) {
  const formattedTime = moment(locationMessage.createdAt).format('HH:mm');

  let li = $('<li></li>');
  let anchor = $('<a target="_blank"></a>');
  let div = $('<div></div>');
  let mapImg = $('<img></img>');

  li.text(
    `[${formattedTime}] ${
      locationMessage.from
    } says: I am currently here...`
  );
  anchor.attr('href', locationMessage.link);
  mapImg.attr('src', locationMessage.url);

  div.append(mapImg);
  anchor.append(div);
  li.append(anchor);
  $('#messages-panel').append(li);
});

$('#message-form').on('submit', function(evt) {
  evt.preventDefault();

  var messageInput = $('#message-input');

  socket.emit(
    'createMessage',
    { from: 'User', text: messageInput.val() },
    function() {
      messageInput.val('');
    }
  );
});

const btnLocation = $('#btn-send-location');
btnLocation.on('click', function() {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  btnLocation.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(
    function(position) {
      btnLocation.removeAttr('disabled').text('Send location');

      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },
    function() {
      alert('Unable to get your location.');
      btnLocation.removeAttr('disabled').text('Send location');
    }
  );
});
