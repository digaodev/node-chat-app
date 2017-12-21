const generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: new Date().getTime()
  };
};

const generateLocationMessage = (from, latitude, longitude) => {
  const link = `https://www.google.com/maps/place/${latitude},${longitude}`;
  const url = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=11&scale=2&size=250x100&maptype=roadmap&format=jpg&visual_refresh=true&markers=size:small%7Ccolor:0xaa3ca4%7C${latitude},${longitude}`;

  return {
    from,
    link,
    url,
    createdAt: new Date().getTime()
  };
};

module.exports = {
  generateMessage,
  generateLocationMessage
};
