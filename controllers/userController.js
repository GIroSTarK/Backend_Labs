const userService = require('../services/UserService');

const createUser = (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });

  const user = userService.createUser(name);
  res.status(201).json(user);
};

const getUser = (req, res) => {
  const user = userService.getUser(req.params.user_id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
};

const deleteUser = (req, res) => {
  const user = userService.deleteUser(req.params.user_id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ message: 'User deleted' });
};

const getAllUsers = (req, res) => {
  res.json(userService.getAllUsers());
};

module.exports = {
  createUser,
  getUser,
  deleteUser,
  getAllUsers,
};
