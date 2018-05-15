const expect = require('chai').expect;

require('dotenv').config();
const key = process.env.GOOGLE_MAPS_KEY;

const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    const from = 'Mike';
    const text = 'Hello chat';

    const msg = generateMessage(from, text);

    expect(msg).to.be.an('object');
    expect(msg.from).to.equal(from);
    expect(msg.text).to.equal(text);
    expect(msg.createdAt).to.be.a('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate the correct location message object', () => {
    const from = 'John';
    const latitude = 12345;
    const longitude = 67890;
    const link = `https://www.google.com/maps/place/${latitude},${longitude}`;
    const url = `https://maps.googleapis.com/maps/api/staticmap?center=12345,67890&zoom=11&scale=2&size=250x100&maptype=roadmap&format=jpg&visual_refresh=true&markers=size:small%7Ccolor:0xaa3ca4%7C12345,67890&key=${key}`;

    const msg = generateLocationMessage(from, latitude, longitude);

    expect(msg).to.be.an('object');
    expect(msg.from).to.equal(from);
    expect(msg.link).to.equal(link);
    expect(msg.url).to.equal(url);
    expect(msg.createdAt).to.be.a('number');
  });
});