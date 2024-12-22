const userService = require('../services/UserService');

const createUser = async (req, res, next) => {
  try {
    const { name } = req.body;
    const user = await userService.createUser(name);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await userService.getUser(req.params.user_id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await userService.deleteUser(req.params.user_id);
    res.json({ message: 'User deleted', user });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  getUser,
  deleteUser,
  getAllUsers,
};
