const express = require("express") ; // importing express
const challengesController = require("../controllers/challengesController") ; // importing challenges controller

const router = express.Router() ; // creating router instance from express

router.post('/', challengesController.createChallenge) ; // create new challenge with POST
router.get('/', challengesController.getChallenges) ; // see all challenges with GET
router.put('/:challenge_id', challengesController.updateChallengeById) ; // update challenges by their id with PUT
router.delete('/:challenge_id', challengesController.deleteChallengeById) ; // delete challenges by their id with DELETE
router.post('/:challenge_id/',challengesController.createChallengeCompletion) ; // create challenge completion with POST
router.get('/:challenge_id/', challengesController.getUsersByChallengeId) ; // view guests by challenge id with GET

module.exports = router ; // exporting the router