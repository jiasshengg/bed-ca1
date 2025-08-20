## Folder Structure
├─ src
│  ├─ configs                
│  │  └─ db.js  
│  │
│  ├─ controllers            
│  │  ├─ challengesController.js  
│  │  ├─ petController.js  
│  │  └─ userController.js
│  │
│  ├─ middleware               
│  │  └─ logger.js        
│  │
│  ├─ models                 
│  │  ├─ challengesModel.js       
│  │  ├─ petModel.js       
│  │  └─ userModel.js   
│  │
│  ├─ routes                 
│  │  ├─ challengesRoutes.js       
│  │  ├─ mainRoutes.js      
│  │  ├─ petRoutes.js   
│  │  └─ userRoutes.js 
│  │              
│  └─ app.js   
│  
├─ .gitignore     
├─ package-lock.json                                           
├─ package.json              
└─ readme.md   
       
## Run through of how the users and fitness challenge system works (Section A)
Users can complete challenges to earn skillpoints. The amount of skillpoints they earn vary
between the different challenges and whether they pass the challenge or not. Users can update 
their details and also view the list of challenges they can attempt.

## Run through of how the pet system works (Section B)

Users are able to view the pets in the shop and see the breed, abilities and how much it costs.
The cost of the pets depend on its abilities and how effectively it will aid the user.
Users are also able to send these pets for training to enhance their abilities, viewing of the pets in training 
were also added so users will know which of their pets are currently in training.
Additionally, users could also choose to upload their pets into the shop.

## Things to do before starting :

* Open up your terminal and type these in to install : 

"npm init" 
"npm install express nodemon dotenv mysql2"