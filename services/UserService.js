const bcrypt = require('bcrypt');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');

class UserService {
  async createUser(name, password) {
    if (!name) {
      throw new ApiError(400, 'Name is required');
    }
    if (!password) {
      throw new ApiError(400, 'Password is required');
    }
    const existingUser = await User.findOne({
      where: {
        name,
      },
    });
    if (existingUser) {
      throw new ApiError(400, 'Such user already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, hashedPassword });
    return user;
  }

  async loginUser(id, name, password) {
    if (!name) {
      throw new ApiError(400, 'Name is required');
    }
    if (!password) {
      throw new ApiError(400, 'Password is required');
    }
    const user = await User.findByPk(id);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new ApiError(400, 'Incorrect password');
    }
    const token = jwt.sign(
      { id: user.id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '1 day' }
    );
    return token;
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
