const express = require('express');
const userRouter = require('./routes/userRouter');
const usersRouter = require('./routes/usersRouter');
const categoryRouter = require('./routes/categoryRouter');
const recordRouter = require('./routes/recordRouter');
const { connectToDatabase } = require('./config/db');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/user', userRouter);
app.use('/users', usersRouter);
app.use('/category', categoryRouter);
app.use('/record', recordRouter);

const startServer = async () => {
  try {
    await connectToDatabase();
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();
