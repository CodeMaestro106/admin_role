// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: 'postgres',
      port: process.env.DB_PORT,
      logging: false,
      define: {
        // Global options for models, e.g., freezeTableName to prevent Sequelize from pluralizing table names
        freezeTableName: true,
      },
    }
  );

// test connect database
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('PostgreSQL connected');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = { sequelize, connectDB };
