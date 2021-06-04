const mysql = require('mysql2');

const db = mysql.createPool({
  user: 'root',
  host: 'localhost',
  password: 'password',
  database: 'users_manager',
});

module.exports = db;