const { Category, User } = require('../models');
const ApiError = require('../utils/ApiError');

class CategoryService {
  async createCategory(categoryName, userId, isPersonal) {
    if (!categoryName) {
      throw new ApiError(400, 'Category name is required');
    }

    const user = await User.findByPk(userId);
    if (!user) {
      throw new ApiError(401, 'Only existing users can create categories');
    }

    const category = await Category.create({
      categoryName,
      userId,
      isPersonal,
    });
    return category;
  }

  async getCategory(id) {
    const category = await Category.findByPk(id);
    if (!category) {
      throw new ApiError(404, 'Category not found');
    }
    return category;
  }

  async getPersonalCategories(userId) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new ApiError(
        401,
        'Only existing users can get personal categories'
      );
    }

    const categories = await Category.findAll({
      where: {
        userId,
        isPersonal: true,
      },
    });
    return categories;
  }

  async getAllCategories() {
    return await Category.findAll({
      where: {
        isPersonal: false,
      },
    });
  }

  async deleteCategory(categoryId, userId) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new ApiError(401, 'Only existing users can delete categories');
    }
    const category = await this.getCategory(categoryId);
    if (category.userId !== userId) {
      throw new ApiError(403, 'Access denied');
    }
    await category.destroy();
  }
}

module.exports = new CategoryService();
