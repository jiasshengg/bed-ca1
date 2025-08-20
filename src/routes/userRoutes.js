const express = require("express") ; // importing express
const userController = require("../controllers/userController") ; // importing user controller

const router = express.Router() ; // creating router instance from express

router.get('/', userController.listUsers) ; // displaying all the users with GET
router.post('/', userController.createUser) ; // creating new user with POST
router.put('/:user_id', userController.updateUserById) ; // update user details with their user id with PUT

module.exports = router ; // exporting the router