const express = require("express") ; // importing express
const petController = require("../controllers/petController") ; // importing pet cntroller

const router = express.Router() ; // creating router instance from express

router.post('/shop', petController.uploadPetsForSale) ; // creating new pets for sale in the shop with POST
router.post('/', petController.addPets) ; // adding pets with POST
router.put('/training', petController.sendPetforTraining) ; // sending PETS for training with PUT
router.get('/shop', petController.viewShop) ; // view the shop with GET
router.get('/training', petController.viewPetTraining) ; // view the pets in training with GET
router.get('/:user_id', petController.viewPetsByUserId) ; // view the pets owned by users with their user id


module.exports = router ; // exporting the router