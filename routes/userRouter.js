const express = require('express');
const router = express.Router();
const {
  createUser,
  getUser,
  deleteUser,
  loginUser,
} = require('../controllers/userController');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/:userId', getUser);
router.delete('/', authenticateToken, deleteUser);

module.exports = router;
