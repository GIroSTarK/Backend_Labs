const { v4: uuidv4 } = require('uuid');

class UserService {
  constructor() {
    this.users = {};
  }

  createUser(name) {
    const id = uuidv4();
    const user = { id, name };
    this.users[id] = user;
    return user;
  }

  getUser(id) {
    return this.users[id] || null;
  }

  getAllUsers() {
    return Object.values(this.users);
  }

  deleteUser(id) {
    const user = this.getUser(id);
    if (user) {
      delete this.users[id];
    }
    return user;
  }
}

module.exports = new UserService();
