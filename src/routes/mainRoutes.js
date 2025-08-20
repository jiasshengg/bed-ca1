const express = require('express'); // importing express

const userRoutes = require('./userRoutes') ;
const challengesRoutes = require('./challengesRoutes') ;
const petRoutes = require('./petRoutes') ;
const middleware = require('../middleware/logger') ;

const router = express.Router(); // creating router instance from express

router.use(middleware) ; // applying middleware for all the routes

router.use("/users", userRoutes) ; // route for handling users
router.use("/challenges", challengesRoutes); // route for handling challenges
router.use("/pets", petRoutes) ; // route for handling pets

module.exports = router ; // exporting the router
