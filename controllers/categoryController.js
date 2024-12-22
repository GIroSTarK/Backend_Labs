const categoryService = require('../services/CategoryService');

const createCategory = async (req, res, next) => {
  try {
    const { categoryName, userId, isPersonal = false } = req.body;
    const category = await categoryService.createCategory(
      categoryName,
      userId,
      isPersonal
    );
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

const getPersonalCategories = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const categories = await categoryService.getPersonalCategories(userId);
    res.json(categories);
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
    const categoryId = req.params.categoryId;
    const category = await categoryService.deleteCategory(categoryId);
    res.json({ message: 'Category deleted', category });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCategory,
  getPersonalCategories,
  getAllCategories,
  deleteCategory,
};
