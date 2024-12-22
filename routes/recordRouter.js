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
router.delete('/:recordId', deleteRecord);
router.get('/', getFilteredRecords);

module.exports = router;
