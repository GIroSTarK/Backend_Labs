const { Record, User, Category } = require('../models');
const ApiError = require('../utils/ApiError');

class RecordService {
  async createRecord(userId, categoryId, expenseAmount) {
    if (!userId || !categoryId || !expenseAmount) {
      throw new ApiError(
        400,
        'All fields (userId, categoryId, expenseAmount) are required'
      );
    }

    const user = await User.findByPk(userId);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    const category = await Category.findByPk(categoryId);
    if (!category) {
      throw new ApiError(404, 'Category not found');
    }

    return await Record.create({
      userId,
      categoryId,
      createdAt: new Date(),
      expenseAmount,
    });
  }

  async getRecord(id) {
    const record = await Record.findByPk(id);
    if (!record) {
      throw new ApiError(404, 'Record not found');
    }
    return record;
  }

  async getRecords(filter = {}) {
    if (!filter.userId && !filter.categoryId) {
      throw new ApiError(400, 'userId or categoryId is required');
    }

    const where = {};

    if (filter.userId) {
      where.userId = filter.userId;
    }
    if (filter.categoryId) {
      where.categoryId = filter.categoryId;
    }

    const records = await Record.findAll({ where });
    return records;
  }

  async deleteRecord(id) {
    const record = await this.getRecord(id);
    await record.destroy();
    return record;
  }
}

module.exports = new RecordService();
