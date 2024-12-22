const express = require('express');
const router = express.Router();
const {
  createUser,
  getUser,
  deleteUser,
} = require('../controllers/userController');

router.post('/', createUser);
router.get('/:userId', getUser);
router.delete('/:userId', deleteUser);

module.exports = router;
