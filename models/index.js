const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
  }
);

const defineUser = require('./User');
const defineCategory = require('./Category');
const defineRecord = require('./Record');

const User = defineUser(sequelize);
const Category = defineCategory(sequelize);
const Record = defineRecord(sequelize);

User.hasMany(Record, { foreignKey: 'userId' });
Record.belongsTo(User, { foreignKey: 'userId' });

Category.hasMany(Record, { foreignKey: 'categoryId' });
Record.belongsTo(Category, { foreignKey: 'categoryId' });

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      'Connection to the database has been established successfully.'
    );
    await sequelize.sync({ force: true });
    console.log('Database synced.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = {
  sequelize,
  connectToDatabase,
  User,
  Category,
  Record,
};
