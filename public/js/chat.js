var socket = io();

function scrollToBottom() {
  // selectors
  var messages = $('#messages');
  var newMessage = messages.children('li:last-child');

  // heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight() || 0;

  if (
    clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=
    scrollHeight
  ) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function() {
  var params = $.deparam(window.location.search);

  socket.emit('join', params, function(err) {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('no error');
    }
  });
});

socket.on('disconnect', function() {
  console.log('disconnected from the server');
});

socket.on('newMessage', function(newMessage) {
  var formattedTime = moment(newMessage.createdAt).format('HH:mm');

  var template = $('#message-template').html();

  var html = Mustache.render(template, {
    from: newMessage.from,
    text: newMessage.text,
    createdAt: formattedTime
  });

  console.log('newmessage = ', html);
  $('#messages').append(html);
  scrollToBottom();
  // let li = $('<li></li>');
  // li.text(`[${formattedTime}] ${newMessage.from} says: ${newMessage.text}`);

  // $('#messages-panel').append(li);
});

socket.on('newLocationMessage', function(locationMessage) {
  var formattedTime = moment(locationMessage.createdAt).format('HH:mm');

  var template = $('#location-message-template').html();

  var html = Mustache.render(template, {
    from: locationMessage.from,
    text: 'I am currently here...',
    link: locationMessage.link,
    url: locationMessage.url,
    createdAt: formattedTime
  });

  $('#messages').append(html);
  scrollToBottom();
  // let li = $('<li></li>');
  // let anchor = $('<a target="_blank"></a>');
  // let div = $('<div></div>');
  // let mapImg = $('<img></img>');

  // li.text(
  //   `[${formattedTime}] ${locationMessage.from} says: I am currently here...`
  // );
  // anchor.attr('href', locationMessage.link);
  // mapImg.attr('src', locationMessage.url);

  // div.append(mapImg);
  // anchor.append(div);
  // li.append(anchor);
  // $('#messages-panel').append(li);
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
