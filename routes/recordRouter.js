const express = require('express');
const router = express.Router();
const {
  createRecord,
  getRecord,
  deleteRecord,
  getFilteredRecords,
} = require('../controllers/recordController');

router.post('/', createRecord);
router.get('/:recordId', getRecord);
router.get('/', getFilteredRecords);
router.delete('/:recordId', deleteRecord);

module.exports = router;
