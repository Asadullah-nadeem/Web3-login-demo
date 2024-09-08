require('dotenv').config(); 
const mysql = require('mysql2');
const pool = mysql.createPool({
    connectionLimit: 10, 
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});
const promisePool = pool.promise();

promisePool.getConnection()
    .then(connection => {
        console.log('✅ Successfully connected to MySQL');
        connection.release();
    })
    .catch(err => {
        console.error('❌ Error connecting to MySQL:', err.message);
        throw err;
    });

module.exports = promisePool;
