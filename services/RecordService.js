const { v4: uuidv4 } = require('uuid');

class RecordService {
  constructor() {
    this.records = {};
  }

  createRecord(userId, categoryId, amountOfExpenses) {
    const id = uuidv4();
    const date = new Date();
    const record = { id, userId, categoryId, date, amountOfExpenses };
    this.records[id] = record;
    return record;
  }

  getRecord(id) {
    return this.records[id] || null;
  }

  getRecords(filter = {}) {
    let result = Object.values(this.records);

    if (filter.userId) {
      result = result.filter((record) => record.userId == filter.userId);
    }
    if (filter.categoryId) {
      result = result.filter(
        (record) => record.categoryId == filter.categoryId
      );
    }

    return result;
  }

  deleteRecord(id) {
    const record = this.getRecord(id);
    if (record) {
      delete this.records[id];
    }
    return record;
  }
}

module.exports = new RecordService();
