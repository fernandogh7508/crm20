require('dotenv').config();
const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    //port: process.env.DB_PORT,
    waitForConnections: true, // Wait for a connection before attempting to create a new one
    queueLimit: 0, // Maximum number of connections to wait in the queue before refusing new connections
   connectionLimit:10

});
module.exports = pool;