const recordService = require('../services/RecordService');

const createRecord = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { categoryId, expenseAmount } = req.body;

    const record = await recordService.createRecord(
      userId,
      categoryId,
      expenseAmount
    );
    res.status(201).json(record);
  } catch (error) {
    next(error);
  }
};

const getRecord = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { recordId } = req.params;

    const record = await recordService.getRecord(recordId, userId);
    res.json(record);
  } catch (error) {
    next(error);
  }
};

const getFilteredRecords = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { categoryId } = req.query;

    const filter = {};
    if (categoryId) filter.categoryId = categoryId;

    const records = await recordService.getRecords(userId, filter);
    res.json(records);
  } catch (error) {
    next(error);
  }
};

const deleteRecord = async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    const { recordId } = req.params;

    await recordService.deleteRecord(recordId, userId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRecord,
  getRecord,
  deleteRecord,
  getFilteredRecords,
};
