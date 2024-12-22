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
    const { record_id } = req.params;

    const record = await recordService.getRecord(record_id);
    res.json(record);
  } catch (error) {
    next(error);
  }
};

const deleteRecord = async (req, res, next) => {
  try {
    const { record_id } = req.params;

    const deletedRecord = await recordService.deleteRecord(record_id);
    res.json({ message: 'Record deleted', deletedRecord });
  } catch (error) {
    next(error);
  }
};

const getFilteredRecords = async (req, res, next) => {
  try {
    const { user_id, category_id } = req.query;

    const filter = {};
    if (user_id) filter.userId = user_id;
    if (category_id) filter.categoryId = category_id;

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
