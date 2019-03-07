const pgp = require('pg-promise')();

const db = pgp(process.env.DB_CONNECTION);

module.exports = db;
