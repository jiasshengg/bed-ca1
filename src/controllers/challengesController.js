const challengesModel = require("../models/challengesModel"); // importing challenges model

// function to create a new challenge
module.exports.createChallenge = (req, res, next) => {
  if (
    req.body.user_id === undefined ||
    req.body.challenge === undefined ||
    req.body.skillpoints === undefined // making sure fields are filled
  ) {
    res.status(400).json({
      message: "Missing required data.",
    });
    return;
  }

  // geting data from request body
  const data = {
    challenge: req.body.challenge,
    creator_id: req.body.user_id,
    skillpoints: req.body.skillpoints,
  };

  // callback function to handle the database response
  const callback = (error, results) => {
    if (error) {
      console.error("Error createChallenge:", error);
      res.status(500).json(error);
    }

    // response data
    const responseData = {
      challenge_id: results.insertId,
      ...data,
    };

    res.status(201).json(responseData);
  };

  challengesModel.createChallenge(data, callback); // calling the model
};

// function to see all the challenges
module.exports.getChallenges = (req, res, next) => {
  // callback function to handle the database response
  const callback = (error, results) => {
    if (error) {
      console.error("Error getChallenges:", error);
      res.status(500).json(error);
    } else {
      if (results.length === 0) {
        res.status(404).json({
          message: "No challenges found.",
        });
        return;
      }

      res.status(200).json(results);
    }
  };

  challengesModel.getChallenges(callback); // calling the model
};

// function to update the challenge by its id 
module.exports.updateChallengeById = (req, res, next) => {
  if (
    req.body.user_id === undefined ||
    req.body.challenge === undefined ||
    req.body.skillpoints === undefined // making sure the fields are filled in
  ) {
    res.status(400).json({
      message: "Error: user_id, challenge or skillpoints is undefined",
    });
    return;
  }

  // getting data from parameters and request body
  const data = {
    challenge_id: req.params.challenge_id,
    challenge: req.body.challenge,
    user_id: req.body.user_id,
    skillpoints: req.body.skillpoints,
  };

  // callback function to handle the database response
  const callback = (error, results) => {
    if (error) {
      console.error("Error updateUserById:", error);
      res.status(500).json(error);
    } else {
      if (results.affectedRows == 0) { // if no change
        return res.status(404).json({
          message: "Challenge not found",
        });
      }

      // response data
      const responseData = {
        challenge_id: data.challenge_id,
        challenge: data.challenge,
        creator_id: data.user_id,
        skillpoints: data.skillpoints,
      };

      res.status(200).json(responseData);
    }
  };

  challengesModel.updateChallengeById(data, callback); // calling model
};

// function to delete a challenge by providing its id
module.exports.deleteChallengeById = (req, res, next) => {
  
  // getting id from parameters
  const data = {
    challenge_id: req.params.challenge_id,
  };

  // callback function to handle the database response
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error deleteChallengeById:", error);
      res.status(500).json(error);
    } else {
      if (results.affectedRows === 0) { // if no change
        res.status(404).json({
          message: "Challenge not found.",
        });
      } else res.status(204).send();
    }
  };

  challengesModel.deleteChallengeById(data, callback); // calling the model
};

// function to create challenge completion
module.exports.createChallengeCompletion = (req, res, next) => {
  if (req.body.creation_date == undefined) { // making sure this field is filled 
    res.status(400).json({
      message: "Missing required data",
    });
    return;
  }

  if (req.body.user_id == undefined || req.params.challenge_id == undefined) { // making sure this request body and params data are present
    res.status(404).json({
      message: "User or Challenge Not Found",
    });
    return;
  }

  // getting data from params and req body
  const data = {
    challenge_id: req.params.challenge_id,
    user_id: req.body.user_id,
    completed: req.body.completed,
    creation_date: req.body.creation_date,
    notes: req.body.notes,
  };

  // function to award skillpoints to the user based on challenge completion
  const awardSkillpoints = (userId, challengeId, completed) => {

    // to fetch the user's current skillpoints
    challengesModel.getUserSkillpoints(userId, (error, userResults) => { 
      if (error) {
        console.error("Error fetching user skillpoints:", error);
        return res.status(500).json(error);
      }

      // check if user exists
      if (userResults.length === 0) { 
        return res.status(404).json({ message: "User not found." });
      }
      
      const userSkillpoints = userResults[0].skillpoints;
      
      // to update skillpoints
      const updateSkillpoints = (pointsToAdd) => {
        const updatedSkillpoints = userSkillpoints + pointsToAdd;
        challengesModel.updateUserSkillpoints(
          { skillpoints: updatedSkillpoints, user_id: userId },
          (updateError) => {
            if (updateError) {
              console.error("Error updating user skillpoints:", updateError);
              return res.status(500).json(updateError);
            }
          }
        );
      };
      // to determine how much skillpoints to award
      if (completed) {
        challengesModel.getChallengeSkillpoints(challengeId, (challengeError, challengeResults) => {
          if (challengeError) {
            console.error("Error fetching challenge skillpoints:", challengeError);
            return res.status(500).json(challengeError);
          }
          // to check if the challenge exists
          if (!challengeResults || challengeResults.length === 0) {
            return res.status(404).json({ message: "Challenge not found." });
          }
  
          const challengeSkillpoints = challengeResults[0].skillpoints;
          // add the skillpoints based on the challenge
          updateSkillpoints(challengeSkillpoints);
        });
      } else {
        updateSkillpoints(5); // 5 skillpoint award for not completed but attempted
      }
    });
  };

  // callback function to handle the database response
  const callback = (error, results) => {
    if (error) {
      console.error("Error createChallengeCompletion:", error);
      res.status(500).json(error);
      return;
    }

    // to award skill points
    awardSkillpoints(data.user_id, data.challenge_id, data.completed);

    // response data
    const responseData = {
      complete_id: results.insertId,
      ...data,
    };

    res.status(201).json(responseData);
  };

  challengesModel.createChallengeCompletion(data, callback); // calling model
};

// function to get the list of users who attempted the challenge by the challenge id
module.exports.getUsersByChallengeId = (req, res, next) => {

  // get data from the parameters
  const data = {
    challenge_id: req.params.challenge_id,
  };

    // callback function to handle the database response
  const callback = (error, results, fields) => {
    if (error) {
      console.error("Error getUsersByChallengeId:", error);
      res.status(500).json(error);
    } else {
      if (results.length === 0) {
        res.status(404).json({
          message: "No users found.",
        });
        return;
      }

      // response data
      const responseData = results.map((result) => ({
        user_id: result.user_id,
        completed: result.completed === 1,
        creation_date: result.creation_date,
        notes: result.notes,
      }));

      res.status(200).json(responseData);
    }
  };

  challengesModel.getUsersByChallengeId(data, callback); // calling the model
};
