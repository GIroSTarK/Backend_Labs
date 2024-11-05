const express = require('express');
const router = express.Router();
const {
  createRecord,
  getRecord,
  deleteRecord,
  getFilteredRecords,
} = require('../controllers/recordController');

router.post('/', createRecord);
router.get('/:record_id', getRecord);
router.delete('/:record_id', deleteRecord);
router.get('/', getFilteredRecords);

module.exports = router;
