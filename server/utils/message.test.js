const expect = require('chai').expect;

const { generateMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    let name = 'Mike';
    let text = 'Hello chat';

    let msg = generateMessage(name, text);

    expect(msg).to.be.an('object');
    expect(msg.from).to.equal(name);
    expect(msg.text).to.equal(text);
    expect(msg.createdAt).to.be.a('number');
  });
});
