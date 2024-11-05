const categoryService = require('../services/CategoryService');

const createCategory = (req, res) => {
  const { name } = req.body;
  if (!name)
    return res.status(400).json({ error: 'Category name is required' });

  const category = categoryService.createCategory(name);
  res.status(201).json(category);
};

const getAllCategories = (req, res) => {
  res.json(categoryService.getAllCategories());
};

const deleteCategory = (req, res) => {
  const category = categoryService.deleteCategory(req.params.category_id);
  if (!category) return res.status(404).json({ error: 'Category not found' });
  res.json({ message: 'Category deleted' });
};

module.exports = {
  createCategory,
  getAllCategories,
  deleteCategory,
};
