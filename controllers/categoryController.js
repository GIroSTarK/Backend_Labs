const categoryService = require('../services/CategoryService');

const createCategory = async (req, res, next) => {
  try {
    const { categoryName } = req.body;
    const category = await categoryService.createCategory(categoryName);
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.category_id;
    const category = await categoryService.deleteCategory(categoryId);
    res.json({ message: 'Category deleted', category });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  deleteCategory,
};
