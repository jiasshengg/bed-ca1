const petModel = require("../models/petModel"); // importing pet model

// function to upload pets for sale to the database
module.exports.uploadPetsForSale = (req, res, next) => {
  const data = {
    breed: req.body.breed,
    abilities: req.body.abilities,
    cost: req.body.cost,
  };

  // making sure these fields are filled
  if (req.body.breed == undefined || req.body.cost == undefined) {
    res.status(400).json({
      message: "Missing required data.",
    });
    return;
  }

  // callback function to handle the database response
  const callback = (error, results) => {
    if (error) {
      console.error("Error uploadPetsForSale:", error);
      res.status(500).json(error);
    }
    
    // response data
    const responseData = {
      pet_id: results.insertId,
      ...data,
    };

    res.status(201).json(responseData);
  };

  petModel.uploadPetsForSale(data, callback); // calling model
};

// function to add pets to a user
module.exports.addPets = (req, res, next) => {
  if (
    req.body.user_id == undefined || 
    req.body.pet_id == undefined ||
    req.body.pet_name == undefined    // making sure these fields are filled
  ) {
    res.status(400).send("Missing required data");
    return;
  }
  
  // get data from request body 
  const data = {
    user_id: req.body.user_id,
    pet_id: req.body.pet_id,
    pet_name: req.body.pet_name,
    abilities: req.body.abilities,
  };

  // callback function to handle the database response
  const callback = (error, results) => {
    if (error) {
      console.error("Error createUser:", error);
      res.status(500).json(error);
    } else {
      res.status(201).json(data); 
    }
  };

  petModel.addPets (data, callback); // calling model
};

// function to see what pets a user has
module.exports.viewPetsByUserId = (req, res, next) => {
  
  // get data from parameters
  const data = {
    user_id: req.params.user_id,
  };

  // callback function to handle database response
  const callback = (error, results) => {
    if (error) {
      console.error("Error viewPets:", error);
      res.status(500).json(error);
    } else {
      if (results.length === 0) {
        res.status(404).json({
          message: "No Pets found.",
        });
        return;
      }

      // response data
      const responseData = results.map((result) => ({
        user_id: result.user_id,
        pet_id: result.pet_id,
        pet_name: result.pet_name,
        abilities: result.abilities,
      }));

      res.status(200).json(responseData);
    }
  };

  petModel.viewPetsByUserId(data, callback); // calling the model
};

// function to send pets for training
module.exports.sendPetforTraining = (req, res, next) => {
  if (
    req.body.pet_id === undefined ||
    req.body.ability_training === undefined //making sure these fields are filled before proceeding
  ) {
    res.status(400).json({
      message: "Missing required data",
    });
    return;
  }

  // getting data from req body and setting training_id to a default of 1
  const data = {
    training_id: 1,
    pet_id: req.body.pet_id,
    ability_training: req.body.ability_training,
  };

  // callback function to handle database response
  const callback = (error, results) => {
    if (error) {
      console.error("Error updateUserById:", error);
      res.status(500).json(error);
    } else {
      if (results.affectedRows == 0) {
        res.status(404).json({
          message: "Pet not found",
        });
      } else res.status(204).send();
    }
  };
  petModel.sendPetforTraining(data, callback); // calling the model
};

// function to view what is in the shop
module.exports.viewShop = (req, res, next) => {

  // callback function to handle database response
  const callback = (error, results) => {
    if (error) {
      console.error("Error viewShop:", error);
      res.status(500).json(error);
    } else {
      if (results.length === 0) {
        res.status(404).json({
          message: "No pets found in shop.",
        });
        return;
      }

      res.status(200).json(results);
    }
  };

  petModel.viewShop(callback); // calling the model
};

// function to view the pets in training
module.exports.viewPetTraining = (req, res, next) => {

  // callback function to handle database response
  const callback = (error, results) => {
    if (error) {
      console.error("Error viewPetTraining:", error);
      res.status(500).json(error);
    } else {
      if (results.length === 0) {
        res.status(404).json({
          message: "No pets found in training.",
        });
        return;
      }

      res.status(200).json(results);
    }
  };

  petModel.viewPetTraining(callback); // calling the model
};