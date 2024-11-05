const express = require('express');
const router = express.Router();
const {
  createCategory,
  getAllCategories,
  deleteCategory,
} = require('../controllers/categoryController');

router.post('/', createCategory);
router.get('/', getAllCategories);
router.delete('/:category_id', deleteCategory);

module.exports = router;
