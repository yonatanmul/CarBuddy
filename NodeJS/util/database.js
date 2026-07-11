const mysql = require('mysql2');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'carbuddy',
    password: 'Z6k25BxALR',
    dateStrings: true
});
module.exports = pool.promise();