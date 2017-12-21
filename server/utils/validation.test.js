const expect = require('chai').expect;

const { isRealString } = require('./validation');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    const str = 12345;

    const res = isRealString(str);

    expect(res).to.be.a('boolean');
    expect(res).to.be.false;
  });

  it('should reject strings with only spaces', () => {
    const str = '   ';

    const res = isRealString(str);

    expect(res).to.be.a('boolean');
    expect(res).to.be.false;
  });

  it('should allow string with non-space chars', () => {
    const str = ' ab c de ';

    const res = isRealString(str);

    expect(res).to.be.a('boolean');
    expect(res).to.be.true;
  });
});
