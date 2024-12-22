const { User } = require('../models');
const ApiError = require('../utils/ApiError');

class UserService {
  async createUser(name) {
    if (!name) {
      throw new ApiError(400, 'Name is required');
    }
    const user = await User.create({ name });
    return user;
  }

  async getUser(id) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    return user;
  }

  async getAllUsers() {
    return await User.findAll();
  }

  async deleteUser(id) {
    const user = await this.getUser(id);
    await user.destroy();
    return user;
  }
}

module.exports = new UserService();
