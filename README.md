## Setup 

1. you can clone the project from by the command
    
    `git clone https://github.com/Salma-3/todo-list.git`
 2. Navigate to the project directory, then move to **backend** directory

    `cd backend`
  
 4. install backend dependencies by:

    `npm install`
    
 5. create a file named **.env** in the backend directory and add the following to it:

    `JWT_SECRET=smawo39dci3dOIdow`  
    `MONGO_URI=mongodb://localhost:27017/todo-dev`
   
 6. compile the source code:
    
     `npm run build`
  
 7. Run the server:

     `npm run start dist/server.js`

 8. From the other terminal window navigate to frontend

    `cd frontend`

 9. install dependencies

     `npm install`
    
 10. start the frontend app

     `npm start`

Now you are all set
