const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
app.use(express.json());

const users = {};
const categories = {};
const records = {};

app.post('/user', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });

  const id = uuidv4();
  users[id] = { id, name };
  res.status(201).json(users[id]);
});

app.get('/user/:user_id', (req, res) => {
  const user = users[req.params.user_id];
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

app.delete('/user/:user_id', (req, res) => {
  const user = users[req.params.user_id];
  if (!user) return res.status(404).json({ error: 'User not found' });
  delete users[req.params.user_id];
  res.json({ message: 'User deleted' });
});

app.get('/users', (req, res) => {
  res.json(Object.values(users));
});

app.post('/category', (req, res) => {
  const { name } = req.body;
  if (!name)
    return res.status(400).json({ error: 'Category name is required' });

  const id = uuidv4();
  categories[id] = { id, name };
  res.status(201).json(categories[id]);
});

app.get('/category', (req, res) => {
  res.json(Object.values(categories));
});

app.delete('/category/:category_id', (req, res) => {
  const category = categories[req.params.category_id];
  if (!category) return res.status(404).json({ error: 'Category not found' });
  delete categories[req.params.category_id];
  res.json({ message: 'Category deleted' });
});

app.post('/record', (req, res) => {
  const { userId, categoryId, amountOfExpenses } = req.body;
  if (!userId || !categoryId || !amountOfExpenses) {
    return res.status(400).json({ error: 'Invalid data' });
  }

  const id = uuidv4();
  const date = new Date();
  records[id] = { id, userId, categoryId, date, amountOfExpenses };
  res.status(201).json(records[id]);
});

app.get('/record/:record_id', (req, res) => {
  const record = records[req.params.record_id];
  if (!record) return res.status(404).json({ error: 'Record not found' });
  res.json(record);
});

app.delete('/record/:record_id', (req, res) => {
  const record = records[req.params.record_id];
  if (!record) return res.status(404).json({ error: 'Record not found' });
  delete records[req.params.record_id];
  res.json({ message: 'Record deleted' });
});

app.get('/record', (req, res) => {
  const { user_id, category_id } = req.query;

  if (!user_id && !category_id) {
    return res
      .status(400)
      .json({ error: 'user_id or category_id is required' });
  }

  let filteredRecords = Object.values(records);

  if (user_id) {
    filteredRecords = filteredRecords.filter(
      (record) => record.userId == user_id
    );
  }
  if (category_id) {
    filteredRecords = filteredRecords.filter(
      (record) => record.categoryId == category_id
    );
  }

  res.json(filteredRecords);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
