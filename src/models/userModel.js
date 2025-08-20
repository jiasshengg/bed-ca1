const pool = require("../config/db"); // importing the database connection

// function to list all the users
module.exports.listUsers = (callback) => {
  const SQLSTATEMENT = `SELECT * FROM user
    `;
  pool.query(SQLSTATEMENT, callback); // execute query
};

// function to create a new user
module.exports.createUser = (data, callback) => {
  const SQLSTATEMENT = `
    INSERT INTO user (username) 
    VALUES (?) ;
    `;

  const VALUES = [data.username];

  pool.query(SQLSTATEMENT, VALUES, callback); // execute query
};

// function to check if the username is already in use
module.exports.checkUser = (data, callback) => {
  const SQLSTATEMENT = ` 
      SELECT user_id FROM user 
      WHERE username = ?;
    `;

  const VALUES = [data.username];

  pool.query(SQLSTATEMENT, VALUES, callback); // execute query
};

// function to update user by their id
module.exports.updateUserById = (data, callback) => {
  const SQLSTATEMENT = `
    UPDATE user 
    SET username = ?, skillpoints = ?
    WHERE user_id = ?;
    `;
  const VALUES = [data.username, data.skillpoints, data.user_id];

  pool.query(SQLSTATEMENT, VALUES, callback); // execute query
};
