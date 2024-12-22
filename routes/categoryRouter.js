const express = require('express');
const router = express.Router();
const {
  createCategory,
  getPersonalCategories,
  getAllCategories,
  deleteCategory,
} = require('../controllers/categoryController');

router.post('/', createCategory);
router.get('/:userId', getPersonalCategories);
router.get('/', getAllCategories);
router.delete('/:categoryId', deleteCategory);

module.exports = router;
