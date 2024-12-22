const express = require('express');
const router = express.Router();
const {
  createCategory,
  getPersonalCategories,
  getAllCategories,
  deleteCategory,
} = require('../controllers/categoryController');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/', authenticateToken, createCategory);
router.get('/personal', authenticateToken, getPersonalCategories);
router.get('/', getAllCategories);
router.delete('/:categoryId', authenticateToken, deleteCategory);

module.exports = router;
