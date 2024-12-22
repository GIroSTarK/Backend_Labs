const recordService = require('../services/RecordService');

const createRecord = async (req, res, next) => {
  try {
    const { userId, categoryId, amountOfExpenses } = req.body;

    const record = await recordService.createRecord(
      userId,
      categoryId,
      amountOfExpenses
    );
    res.status(201).json(record);
  } catch (error) {
    next(error);
  }
};

const getRecord = async (req, res, next) => {
  try {
    const { recordId } = req.params;

    const record = await recordService.getRecord(recordId);
    res.json(record);
  } catch (error) {
    next(error);
  }
};

const deleteRecord = async (req, res, next) => {
  try {
    const { recordId } = req.params;

    const deletedRecord = await recordService.deleteRecord(recordId);
    res.json({ message: 'Record deleted', deletedRecord });
  } catch (error) {
    next(error);
  }
};

const getFilteredRecords = async (req, res, next) => {
  try {
    const { userId, categoryId } = req.query;

    const filter = {};
    if (userId) filter.userId = userId;
    if (categoryId) filter.categoryId = categoryId;

    const records = await recordService.getRecords(filter);
    res.json(records);
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
