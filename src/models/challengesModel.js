const pool = require("../config/db"); // importing database connection

// function to create new challenge
module.exports.createChallenge = (data, callback) => {
  const SQLSTATEMENT = `
    INSERT INTO fitnesschallenge (challenge, creator_id, skillpoints) 
    VALUES (?, ?, ?) ;
    `;

  const VALUES = [data.challenge, data.creator_id, data.skillpoints];

  pool.query(SQLSTATEMENT, VALUES, callback); // execute query
};

// function to see all the challenges
module.exports.getChallenges = (callback) => {
  const SQLSTATEMENT = `SELECT * FROM fitnesschallenge
    `;
  pool.query(SQLSTATEMENT, callback); // execute query
};

// function to update the challenge by its id
module.exports.updateChallengeById = (data, callback) => {
  const SQLSTATEMENT = `
    UPDATE fitnesschallenge
    SET challenge = ?, skillpoints = ?
    WHERE challenge_id = ? AND creator_id = ? ; 
    `;
  const VALUES = [
    data.challenge,
    data.skillpoints,
    data.challenge_id,
    data.user_id,
  ];

  pool.query(SQLSTATEMENT, VALUES, callback); // execute query
};

// function to delete the challenge by its id
module.exports.deleteChallengeById = (data, callback) => {
  const SQLSTATEMENT = `
    DELETE FROM fitnesschallenge WHERE challenge_id = ?;`;
  const VALUES = [data.challenge_id];

  pool.query(SQLSTATEMENT, VALUES, callback); // execute query
};

// function to create challenge completion 
module.exports.createChallengeCompletion = (data, callback) => {
  const SQLSTATEMENT = `
    INSERT INTO usercompletion (user_id, challenge_id, completed, creation_date, notes) 
    VALUES (?, ?, ?, ?, ?) ;
    `;

  const VALUES = [
    data.user_id,
    data.challenge_id,
    data.completed,
    data.creation_date,
    data.notes,
  ];

  pool.query(SQLSTATEMENT, VALUES, callback); // execute query
};

// getting the skillpoints of the user
module.exports.getUserSkillpoints = (userId, callback) => {
  const SQLSTATEMENT = `
    SELECT skillpoints 
    FROM user 
    WHERE user_id = ?
    `;

  pool.query(SQLSTATEMENT, [userId], callback); // execute query
};

// function for getting the skillpoints of the challenge
module.exports.getChallengeSkillpoints = (challengeId, callback) => {
  const SQLSTATEMENT = `
    SELECT skillpoints 
    FROM fitnesschallenge 
    WHERE challenge_id = ?
    `;

  pool.query(SQLSTATEMENT, [challengeId], callback); // execute query
};

// function for updating the skillpoints
module.exports.updateUserSkillpoints = (data, callback) => {
  const SQLSTATEMENT = `
    UPDATE user 
    SET skillpoints = ?
    WHERE user_id = ?
    `;

  const VALUES = [data.skillpoints, data.user_id];

  pool.query(SQLSTATEMENT, VALUES, callback); // execute query
};

// function to see the list of users by the challenge id
module.exports.getUsersByChallengeId = (data, callback) => {
  const SQLSTATEMENT = `
    SELECT * FROM usercompletion WHERE challenge_id = ?;`;
  const VALUES = [data.challenge_id];

  pool.query(SQLSTATEMENT, VALUES, callback); // execute query
};
