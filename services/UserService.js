const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');

class UserService {
  async createUser(name, password) {
    if (!name) {
      throw new ApiError(400, 'Name is required');
    }
    if (name.length < 3) {
      throw new ApiError(400, 'Name should be at least 3 characters');
    }
    if (!password) {
      throw new ApiError(400, 'Password is required');
    }
    if (!password.length < 8) {
      throw new ApiError(400, 'Password must be at least 8 characters');
    }
    if (!/\d/.test(password)) {
      throw new ApiError(400, 'Password must contain a number');
    }
    if (!/[!@#$%^&*]/.test(password)) {
      throw new ApiError(400, 'Password must contain a special character');
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
    const user = await User.create({ name, password: hashedPassword });
    const userWithoutPassword = user.toJSON();
    delete userWithoutPassword.password;
    return userWithoutPassword;
  }

  async loginUser(name, password) {
    if (!name) {
      throw new ApiError(400, 'Name is required');
    }
    if (!password) {
      throw new ApiError(400, 'Password is required');
    }
    const user = await User.findOne({
      where: {
        name,
      },
    });
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
    return await User.findAll({
      attributes: { exclude: ['password'] },
    });
  }

  async deleteUser(id) {
    const user = await this.getUser(id);
    await user.destroy();
  }
}

module.exports = new UserService();
