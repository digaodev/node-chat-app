const expect = require('chai').expect;

const { Users } = require('./users');

describe('Users', () => {
  var users;

  beforeEach('Users', () => {
    users = new Users();

    users.users = [
      {
        id: 1,
        name: 'Mike',
        room: 'Friends'
      },
      {
        id: 2,
        name: 'Ana',
        room: 'Family'
      },
      {
        id: 3,
        name: 'Monica',
        room: 'Friends'
      }
    ];
  });

  it('should add a new user', () => {
    const users = new Users();

    const user = { id: 123, name: 'Mike', room: 'Friends' };

    const res = users.addUser(user.id, user.name, user.room);

    expect(res).to.be.an('object');
    expect(res).to.be.deep.equal(user);
    expect(users.users).to.deep.equal([user]);
  });

  it('should return all user names for the Friends room', () => {
    const userList = users.getUserList('Friends');

    expect(userList).to.be.an('array');
    expect(userList).to.deep.equal(['Mike', 'Monica']);
  });

  it('should return all user names for the Family room', () => {
    const userList = users.getUserList('Family');

    expect(userList).to.be.an('array');
    expect(userList).to.deep.equal(['Ana']);
  });

  it('should find a specific user and return it', () => {
    const userId = 2;

    const res = users.getUser(userId);

    expect(res).to.be.an('object');
    expect(res.name).to.equal('Ana');
  });

  it('should not find a specific user and return undefined', () => {
    const userId = 999;

    const res = users.getUser(userId);

    expect(res).to.be.undefined;
  });

  it('should remove a specific user and return it', () => {
    const userId = 1;

    const res = users.removeUser(userId);

    expect(res).to.be.an('object');
    expect(res.name).to.equal('Mike');
    expect(users.users.length).to.equal(2);
  });

  it('should not remove a specific user and return undefined', () => {
    const userId = 999;

    const res = users.removeUser(userId);

    expect(res).to.be.undefined;
    expect(users.users.length).to.equal(3);
  });
});
