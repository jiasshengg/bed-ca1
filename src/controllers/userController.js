const userModel = require("../models/userModel"); //importing the user model

// function to list all the users
module.exports.listUsers = (req, res, next) => {
  // callback function to handle the database response
  const callback = (error, results) => {
    if (error) {
      console.error("Error listUsers:", error);
      res.status(500).json(error);
    } else {
      if (results.length === 0) {
        res.status(404).json({
          message: "No users found.",
        });
        return;
      }

      res.status(200).json(results);
    }
  };

  userModel.listUsers(callback); // calling the model
};

// function to create new user
module.exports.createUser = (req, res, next) => {

  // making sure this field is filled in 
  if (req.body.username == undefined) {
    res.status(400).send("Error: username is undefined");
    return;
  }

  // getting data from req body and setting skillpoints to a default of 0
  const data = {
    username: req.body.username,
    skillpoints: 0,
  };

  // callback to check if the username already exists
  const checkUserCallback = (error, results) => {
    if (error) {
      console.error("Error checking username:", error);
      res.status(500).json(error);
      return;
    }

    if (results.length > 0) {
      res.status(409).json({ message: "Username is already taken." });
      return;
    }

    // callback function to handle the database response
    const callback = (error, results) => {
      if (error) {
        console.error("Error createUser:", error);
        res.status(500).json(error);
      } else {
        const responseData = {
          user_id: results.insertId,
          username: req.body.username,
          skillpoints: 0,
        };

        res.status(201).json(responseData);
      }
    };

    userModel.createUser(data, callback); // calling createUser model
  };

  userModel.checkUser(data, checkUserCallback); // calling checkUser model
};

// function to update the details of the user by their id
module.exports.updateUserById = (req, res, next) => {
  // making sure these fields are in the req body
  if (req.body.username === undefined || req.body.skillpoints === undefined) {
    res.status(400).json({
      message: "Error: username or skillpoints is undefined",
    });
    return;
  }

  // getting data from the params and request body
  const data = {
    user_id: req.params.user_id,
    username: req.body.username,
    skillpoints: req.body.skillpoints,
  };

  // callback to check if the username already exists
  const checkUserCallback = (error, results) => {
    if (error) {
      console.error("Error checking username:", error);
      res.status(500).json(error);
      return;
    }

    if (results.length > 0) {
      res.status(409).json({ message: "Username is already taken." });
      return;
    }

    // making sure these fields are in the req body
    const callback = (error, results) => {
      if (error) {
        console.error("Error updateUserById:", error);
        res.status(500).json(error);
      } else {
        if (results.affectedRows == 0) {
          res.status(404).json({
            message: "User not found",
          });
        } else {
          res.status(200).json(data);
        }
      }
    };
    userModel.updateUserById(data, callback); // calling the updateUserById model
  };

  userModel.checkUser({ username: req.body.username }, checkUserCallback); // calling checkUser model
};
