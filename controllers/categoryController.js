const categoryService = require('../services/CategoryService');

const createCategory = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { categoryName, isPersonal = false } = req.body;
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
    const userId = req.user.id;
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
    const userId = req.user.id;
    const categoryId = req.params.categoryId;
    await categoryService.deleteCategory(categoryId, userId);
    res.status(204).send();
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
