const express = require('express');
const app = express();

const userRouter = require('./routes/userRouter');
const usersRouter = require('./routes/usersRouter');
const categoryRouter = require('./routes/categoryRouter');
const recordRouter = require('./routes/recordRouter');

app.use(express.json());

app.use('/user', userRouter);
app.use('/users', usersRouter);
app.use('/category', categoryRouter);
app.use('/record', recordRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
