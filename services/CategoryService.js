const { Category } = require('../models');
const ApiError = require('../utils/ApiError');

class CategoryService {
  async createCategory(categoryName) {
    if (!categoryName) {
      throw new ApiError(400, 'Category name is required');
    }
    const category = await Category.create({ categoryName });
    return category;
  }

  async getCategory(id) {
    const category = await Category.findByPk(id);
    if (!category) {
      throw new ApiError(404, 'Category not found');
    }
    return category;
  }

  async getAllCategories() {
    return await Category.findAll();
  }

  async deleteCategory(id) {
    const category = await this.getCategory(id);
    await category.destroy();
    return category;
  }
}

module.exports = new CategoryService();
