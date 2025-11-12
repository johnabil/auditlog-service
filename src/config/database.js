require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DB_URL,
    dialect: 'postgres',
  },

  production: {
    url: process.env.PROD_DB_URL,
    dialect: 'postgres',
  },
};
