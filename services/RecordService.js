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
      throw new ApiError(404, 'Only existing users can make records');
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

  async getRecord(recordId, userId) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new ApiError(401, 'Only existing users can get records');
    }
    const record = await Record.findByPk(recordId);
    if (!record) {
      throw new ApiError(404, 'Record not found');
    }
    if (record.userId !== userId) {
      throw new ApiError(403, 'Access denied');
    }
    return record;
  }

  async getRecords(userId, filter = {}) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new ApiError(401, 'Only existing users can get records');
    }
    const where = { userId };

    if (filter.categoryId) {
      where.categoryId = filter.categoryId;
    }

    const records = await Record.findAll({ where });
    return records;
  }

  async deleteRecord(recordId, userId) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new ApiError(401, 'Only existing users can delete records');
    }
    const record = await this.getRecord(recordId, userId);
    if (record.userId !== userId) {
      throw new ApiError(403, 'Access denied');
    }
    await record.destroy();
  }
}

module.exports = new RecordService();
