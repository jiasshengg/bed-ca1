const pool = require("../config/db"); // importing database connection

// function to add pets into the shop
module.exports.uploadPetsForSale = (data, callback) => {
  const SQLSTATEMENT = `
    INSERT INTO petshop (breed, abilities, cost) 
    VALUES (?, ?, ?) ;
    `;

  const VALUES = [data.breed, data.abilities, data.cost];

  pool.query(SQLSTATEMENT, VALUES, callback); // execute query
};

// function to add pets
module.exports.addPets = (data, callback) => {
  const SQLSTATEMENT = `
    INSERT INTO pets (user_id, pet_id, pet_name, abilities) 
    VALUES (?, ?, ?, ?) ;
    `;

  const VALUES = [data.user_id, data.pet_id, data.pet_name, data.abilities];

  pool.query(SQLSTATEMENT, VALUES, callback); // execute query
};

// function to view the pets owned by a user by their user id
module.exports.viewPetsByUserId = (data, callback) => {
  const SQLSTATEMENT = `SELECT * FROM pets
    WHERE user_id = ?
    `;

  VALUES = [data.user_id];

  pool.query(SQLSTATEMENT, VALUES, callback); // execute query
};

// function to send the pets for training
module.exports.sendPetforTraining = (data, callback) => {
  const SQLSTATEMENT = `
    UPDATE pettraining
    SET pet_id = ? , ability_training = ?
    WHERE training_id = ? ;
    `;
  const VALUES = [data.pet_id, data.ability_training, data.training_id];

  pool.query(SQLSTATEMENT, VALUES, callback); // execute query
};

// function to view the pets in the shop
module.exports.viewShop = (callback) => {
  const SQLSTATEMENT = `SELECT * FROM petshop
    `;
  pool.query(SQLSTATEMENT, callback); // execute query
};

// function to view the pets in training
module.exports.viewPetTraining = (callback) => {
    const SQLSTATEMENT = `SELECT * FROM pettraining
      `;
    pool.query(SQLSTATEMENT, callback); // execute query
  };
  