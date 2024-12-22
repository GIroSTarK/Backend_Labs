const express = require('express');
const ApiError = require('./utils/ApiError');
const userRouter = require('./routes/userRouter');
const usersRouter = require('./routes/usersRouter');
const categoryRouter = require('./routes/categoryRouter');
const recordRouter = require('./routes/recordRouter');
const { connectToDatabase } = require('./models/index');
const authenticateToken = require('./middlewares/authMiddleware');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/user', userRouter);
app.use('/users', usersRouter);
app.use('/category', categoryRouter);
app.use('/record', authenticateToken, recordRouter);
app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

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
