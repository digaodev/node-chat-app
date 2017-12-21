var socket = io();

socket.on('connect', function() {
  console.log('connected to the server');
});

socket.on('disconnect', function() {
  console.log('disconnected from the server');
});

socket.on('newMessage', function(newMessage) {
  let li = $('<li></li>');
  li.text(`${newMessage.from} says: ${newMessage.text}`);

  $('#messages-panel').append(li);
});

socket.on('newLocationMessage', function(locationMessage) {
  let li = $('<li></li>');
  let anchor = $('<a target="_blank"></a>');
  let mapImg = $('<img></img>');

  li.text(`${locationMessage.from} says: I am currently here... [click on the map to open in a new tab]`);
  anchor.attr('href', locationMessage.link);
  mapImg.attr('src', locationMessage.url);

  anchor.append(mapImg);
  li.append(anchor);
  $('#messages-panel').append(li);
});

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

const btnLocation = $('#btn-send-location');
btnLocation.on('click', function() {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }
  navigator.geolocation.getCurrentPosition(
    function(position) {
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },
    function() {
      alert('Unable to get your location.');
    }
  );
});
