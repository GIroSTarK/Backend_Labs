const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
app.use(express.json());

const users = {};

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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
