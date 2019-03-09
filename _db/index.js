const options = {
  error: (error, e) => {
    if (e.cn) {
      // A connection-related error;
      console.log('CN:', e.cn);
      console.log('EVENT:', error.message);
    }
  }
};

const pgp = require('pg-promise')(options);

const db = pgp(process.env.DB_CONNECTION);

module.exports = db;
