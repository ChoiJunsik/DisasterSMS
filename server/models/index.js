const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

// const [rows] = await pool.execute(`select * from user`);

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});
const createUser = async (email, tags) => {
    tags = tags.join(",");
    return await pool.execute(`insert into user (email,tags) values (?,?)`, [email, tags]);
}

module.exports = { createUser };