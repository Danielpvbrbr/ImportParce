require('dotenv').config();
const mysql = require('mysql2');

const pools = {};

function getDbConnection() {
    if (!pools[process.env.DB_DATABASE]) {
        pools[process.env.DB_DATABASE] = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            port: process.env.DB_PORT,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        }).promise();
    }

    return pools[process.env.DB_DATABASE];
}

module.exports = { getDbConnection };
