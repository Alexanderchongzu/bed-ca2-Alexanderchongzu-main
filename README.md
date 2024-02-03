# Express.js + MySQL API Testing

This repository contains a set of tests to verify the functionality of an Express.js API. The tests cover various HTTP routes such as GET, POST, PUT, and DELETE.

## Prerequisites

Before running the tests, ensure that the following dependencies are installed:

- Node.js
- npm (Node Package Manager)

## Clone the Repository

1. Open Visual Studio Code (VSCode) on your local machine.

2. Click on the "Source Control" icon in the left sidebar (the icon looks like a branch).

3. Click on the "Clone Repository" button.

4. In the repository URL input field, enter `https://github.com/ST0503-BED/bed-ca1-Alexanderchongzu.git`.

5. Choose a local directory where you want to clone the repository.

6. Click on the "Clone" button to start the cloning process.

## Setting Up Environment Variables

This repository provides instructions for setting up environment variables using a `.env` file in an Express.js application. The environment variables will be used in the `db.js` file located in the `src/services` directory.

### Setup  

To set up environment variables for your Express.js application, follow these steps:

1. Create a file named .env in the root directory of your project.
2. Open the .env file and add the following lines:

   
   DB_HOST=<your_database_host>
   DB_USER=<your_database_user>
   DB_PASSWORD=<your_database_password>
   DB_DATABASE=<your_database_name>
   

   Replace <your_database_host>, <your_database_user>, <your_database_password>, and <your_database_name> with the appropriate values for your database connection.

   For example:

   
   DB_HOST=localhost
   DB_USER=myuser
   DB_PASSWORD=mypassword
   DB_DATABASE=pokemon
   

   Note: Make sure there are no spaces around the equal sign (=) in each line.

3. Save the .env file.

### Usage

The db.js file in the src/services directory uses the dotenv package to read the .env file and set the environment variables. Here's an example of how the db.js file should look:

javascript
require('dotenv').config(); // Read .env file and set environment variables

const mysql = require('mysql2');

const setting = {
    connectionLimit: 10, // Set limit to 10 connections
    host: process.env.DB_HOST, // Get host from environment variable
    user: process.env.DB_USER, // Get user from environment variable
    password: process.env.DB_PASSWORD, // Get password from environment variable
    database: process.env.DB_DATABASE, // Get database from environment variable
    multipleStatements: true, // Allow multiple SQL statements
    dateStrings: true // Return date as string instead of Date object
}

const pool = mysql.createPool(setting);

module.exports = pool;


The dotenv package is used to load the environment variables from the .env file, and process.env is used to access these variables in your code.

Make sure to include the require('dotenv').config(); line at the beginning of your file to load the environment variables from the .env file.

## Important Note

Ensure that the .env file is included in your .gitignore file to prevent sensitive information (such as database credentials) from being exposed in your version control system.

That's it! You have successfully set up environment variables using a .env file in your Express.js application. These variables can now be accessed in the db.js file or any other part of your application where needed.

Now you can move on to next part below.

## Install Dependencies

1. Open the terminal in VSCode by going to View > Terminal or using the shortcut Ctrl + J.

2. Navigate to the project root directory.

3. Install the required dependencies using npm:

   
   npm install
   

## Database Initialization

1. Make sure you have a MySQL database available for the mock test. Update the database configuration details in the .env file.

2. To initialize the database tables and populate them with sample data, open the terminal in VSCode and run the following command:

   
   npm run init_tables
   

## Starting the Application

1. Open the terminal in VSCode by going to View > Terminal or using the shortcut Ctrl + J.

2. To start the application, open the terminal in VSCode and run the following command:

   
   npm start
   

## Controller, Model and Route Files

The following are a list of files under their respective folders for Section A and B.

### Controller

The following are the controller files for Section A and B:

- Section A
  - taskController.js
  - taskprogressController.js
  - userController.js

- Section B
  - petController.js
  - petbondingController.js
  - petrestController.js

### Model

The following are the model files for Section A and B:

- Section A
  - taskModel.js
  - taskprogressModel.js
  - userModel.js

- Section B
  - petModel.js
  - petbondingModel.js
  - petrestModel.js
 

### Route

The following are the route files for Section A and B:

- Section A and B
  - mainRoutes.js

- Section A
  - taskRoutes.js
  - taskprogressRoutes.js 
  - userRoutes.js

- Section B
  - petRoutes.js
  - petbondingRoutes.js
  - petrestRoutes.js

## Routes

The following are the routes in the application.

### User Routes (Section A)

The following are the user routes:

- POST /user  
  - Endpoint returns a 201 status code and displays the results.
  - Endpoint returns a 400 status code if username or email is missing from request body.
  - Endpoint returns a 409 status code if username or email is already associated with another user.

- GET /user
  - Endpoint returns a 200 status code and displays the results.

- GET /user/{user_id}
  - Endpoint returns a 200 status code if user_id exists and displays the 
    results.
  - Endpoint returns a 404 status code if user_id does not exist.
  
- PUT /user/{user_id}
  - Endpoint returns a 200 status code and displays the results.
  - Endpoint returns a 400 status code if username or email is missing 
    from request body.
  - Endpoint returns a 404 status code if user_id does not exist.
  - Endpoint returns a 409 status code if username or email is already 
    associated with another user.
  
- DELETE /user/{user_id}
  - Endpoint returns a 404 status code if user_id does not exist.
  - Endpoint returns a 204 status code.


### Task Routes (Section A)

The following are the task routes:

- POST /task
  - Sending an empty request body to the endpoint results in a 400 status 
    code.
  - Endpoint returns a 201 status code and displays the results.

- GET /task
  - Endpoint returns a 200 status code and displays the results.

- GET /task/{task_id}
  - Endpoint returns a 200 status code and displays the results.
  - Endpoint returns a 404 status code if task_id does not exit.
  
- PUT /task/{task_id}
  - Endpoint returns a 200 status code and displays the results.
  - Endpoint returns a 400 status code if title or description or points 
    is missing from request body.
  - Endpoint returns a 404 status code if task_id does not exist.
  
- DELETE /task/{task_id}
  - Endpoint returns a 204 status code.
  - Endpoint returns a 404 status code if task_id does not exist.
  

### Task Progress Routes (Section A)

The following are the task progress routes:

- POST /task_progress
  - Endpoint returns a 201 status code and displays the results.
  - Endpoint returns a 400 status code if completion_date is missing from 
    request body.
  - Endpoint returns a 404 status code if user_id does not 
    exist.
  - Endpoint returns a 404 status code if task_id does not 
    exist.

- GET /task_progress/{progress_id}
  - Endpoint returns a 200 status code and displays the results.
  - Endpoint returns a 404 status code if progress_id does not exist.
  
- PUT /task_progress/{progress_id}
  - Endpoint returns a 200 status code and displays the results.
  - Endpoint returns a 400 status code if request body is missing notes.
  - Endpoint returns a 404 status code if progress_id does not exist.

- DELETE /task_progress/{progress_id}
  - Endpoint returns a 204 status code.
  - Endpoint returns a 404 status code if progress_id does not exist.
  

### Pet Routes (Section B)

The following are the pet routes:

- POST /pet
  - Endpoint returns a 201 status code and displays the results.
  - Endpoint returns a 400 status code if petname is missing from 
    request body.
  - Endpoint returns a 404 status code if user_id does not exist.
  - Endpoint returns a 409 status code if petname is existed.
  - Endpoint returns a 409 status code if user_id is posted to more than 
    3 pets such that each user can only have 3 pets.

- GET /pet/:pet_id
  - Endpoint returns a 200 status code and displays the results.
  - Endpoint returns a 404 status code if pet_id does not exist.

- GET /pet
  - Endpoint returns a 200 status code and displays the results.

- PUT /pet/:pet_id
  - Endpoint returns a 200 status code and displays the results.
  - Endpoint returns a 400 status code if notes is missing from 
    request body.
  - Endpoint returns a 404 status code if pet_id does not exist.
  - Endpoint returns a 409 status code if petname is existed.

- DELETE /pet/:pet_id
  - Endpoint returns a 204 status code.
  - Endpoint returns a 404 status code if pet_id does not exist.

### Pet Bonding Routes (Section B)

The following are the pet bonding routes:

- POST /petbonding
 - Endpoint returns a 201 status code and displays the results.
 - Endpoint returns a 404 status code if pet_id does not exist.
 
- GET /petbonding/:petbonding_id
 - Endpoint returns a 200 status code and displays the results.
 - Endpoint returns a 404 status code if petbonding_id does not exist. 

- GET /petbonding/:petbonding_id
 - Endpoint returns a 200 status code and displays the results.

- PUT /petbonding/:petbonding_id
  - Endpoint returns a 200 status code and displays the results.
  - Endpoint returns a 400 status code if groom is missing from 
    request body.
  - Endpoint returns a 404 status code if petbonding_id does not exist.
  - Endpoint returns a 409 status code if pet_id is associated with 
    another petbonding_id.

- DELETE /petbonding/:petbonding_id
  - Endpoint returns a 204 status code.
  - Endpoint returns a 404 status code if petbonding_id does not exist.

### Pet Rest Routes (Section B)

The following are the pet rest routes:

- POST /petrest
 - Endpoint returns a 201 status code and displays the results.
 - Endpoint returns a 400 status code if duration_minutes is missing from 
   request body.
 - Endpoint returns a 404 status code if pet_id does not exist.

- GET /petrest/:rest_id
 - Endpoint returns a 200 status code and displays the results.
 - Endpoint returns a 404 status code if rest_id does not exist. 

- GET /petrest/:rest_id
 - Endpoint returns a 200 status code and displays the results.

- PUT /petrest/:rest_id
  - Endpoint returns a 200 status code and displays the results.
  - Endpoint returns a 400 status code if duration_minutes exceed 1440 as 
    each day only have up to 1440 minutes.
  - Endpoint returns a 400 status code if duration_minutes is missing from 
    request body.
  - Endpoint returns a 404 status code if pet_id does not exist.
  - Endpoint returns a 409 status code if pet_id is associated with 
    another rest_id.

- DELETE /petrest/:rest_id
  - Endpoint returns a 204 status code.
  - Endpoint returns a 404 status code if rest_id does not exist.

## Additional Resources

- Entity-Relationship Diagram (ERD): https://dbdiagram.io/d/654333077d8bbd6465529c8c

CREATE TABLE User (
  user_id INT PRIMARY KEY,
  username TEXT,
  email TEXT
);

CREATE TABLE Task (
  task_id INT PRIMARY KEY,
  title TEXT,
  description TEXT,
  points INT
);

CREATE TABLE TaskProgress (
  progress_id INT PRIMARY KEY,
  user_id INT NOT NULL,
  task_id INT NOT NULL,
  completion_date TIMESTAMP,
  notes TEXT
);

CREATE TABLE Pet (
  pet_id INT PRIMARY KEY,
  user_id INT NOT NULL,
  petname TEXT,
  breeds TEXT,
  notes TEXT
);

CREATE TABLE PetBonding (
  petbonding_id INT PRIMARY KEY,
  pet_id INT NOT NULL,
  groom TEXT,
  feed TEXT,
  bonding_on TIMESTAMP
);

CREATE TABLE PetRest (
  rest_id INT PRIMARY KEY,
  pet_id INT NOT NULL,
  duration_minutes INT,
  rest_status TIMESTAMP
);

ALTER TABLE User ADD FOREIGN KEY (user_id) REFERENCES TaskProgress (user_id);

ALTER TABLE Task ADD FOREIGN KEY (task_id) REFERENCES TaskProgress (task_id);

ALTER TABLE User ADD FOREIGN KEY (user_id) REFERENCES Pet (user_id);

ALTER TABLE Pet ADD FOREIGN KEY (pet_id) REFERENCES PetBonding (pet_id);

ALTER TABLE Pet ADD FOREIGN KEY (pet_id) REFERENCES PetRest (pet_id);
