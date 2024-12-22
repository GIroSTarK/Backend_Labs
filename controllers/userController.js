const userService = require('../services/UserService');

const createUser = async (req, res, next) => {
  try {
    const { name, password } = req.body;
    const user = await userService.createUser(name, password);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { name, password } = req.body;
    const token = await userService.loginUser(name, password);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await userService.getUser(req.params.userId);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = req.user.id;
    await userService.deleteUser(id);
    res.status(204).send();
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
  loginUser,
  getUser,
  deleteUser,
  getAllUsers,
};
