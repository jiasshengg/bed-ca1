const express = require("express") ; // importing express
const dotenv = require("dotenv") ; // importing dotenv

dotenv.config() ;
const app = express() ;
const port = 3000 ;

//Middleware 
app.use(express.json()) ;
app.use(express.urlencoded({extended:false}));

const mainRoutes = require('./routes/mainRoutes'); // importing main routes
app.use("/", mainRoutes);   

// Start the server 
app.listen(3000, () => {
    console.log(`Server Running on http://localhost:3000`) ;
}) ;