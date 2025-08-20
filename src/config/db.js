const mysql = require('mysql2') ; // importing mysql 2
require('dotenv').config(); // load the environmental vars from a dotenv file

const setting = {
    connectionLimit : 10, //set limit to 10 connection
    host     : process.env.DB_HOST, //get host from environment variable
    user     : process.env.DB_USER, //get user from environment variable
    password : process.env.DB_PASSWORD, //get password from environment variable
    database : process.env.DB_DATABASE, //get database from environment variable
    multipleStatements: true, //allow multiple sql statements
    dateStrings: true //return date as string instead of Date object
} 

// to create a connection pool
const pool = mysql.createPool(setting);

// export the pool 
module.exports = pool;