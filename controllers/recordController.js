const recordService = require('../services/RecordService');

const createRecord = (req, res) => {
  const { userId, categoryId, amountOfExpenses } = req.body;
  if (!userId || !categoryId || !amountOfExpenses) {
    return res.status(400).json({ error: 'Invalid data' });
  }

  const record = recordService.createRecord(
    userId,
    categoryId,
    amountOfExpenses
  );
  res.status(201).json(record);
};

const getRecord = (req, res) => {
  const record = recordService.getRecord(req.params.record_id);
  if (!record) return res.status(404).json({ error: 'Record not found' });
  res.json(record);
};

const deleteRecord = (req, res) => {
  const record = recordService.deleteRecord(req.params.record_id);
  if (!record) return res.status(404).json({ error: 'Record not found' });
  res.json({ message: 'Record deleted' });
};

const getFilteredRecords = (req, res) => {
  const { user_id, category_id } = req.query;

  if (!user_id && !category_id) {
    return res
      .status(400)
      .json({ error: 'user_id or category_id is required' });
  }

  const filter = {};
  if (user_id) filter.userId = user_id;
  if (category_id) filter.categoryId = category_id;

  res.json(recordService.getRecords(filter));
};

module.exports = {
  createRecord,
  getRecord,
  deleteRecord,
  getFilteredRecords,
};
