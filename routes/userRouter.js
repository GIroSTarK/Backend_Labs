const express = require('express');
const router = express.Router();
const {
  createUser,
  getUser,
  deleteUser,
} = require('../controllers/userController');

router.post('/', createUser);
router.get('/:user_id', getUser);
router.delete('/:user_id', deleteUser);

module.exports = router;
