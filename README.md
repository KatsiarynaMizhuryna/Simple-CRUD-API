# Simple-CRUD-API

## Description

The primary goal of this project is to use an in-memory database as the foundation for a straightforward CRUD API.

## Installation

1. Clone this repository:<br>

   **git clone git@github.com:KatsiarynaMizhuryna/Simple-CRUD-API.git**

2. Navigate to the project directory:<br>

   **cd simple-crud-api**

3. Install dependencies:<br>

   **npm install**

## Running the Application

**Development Mode**

Run the application in development mode:<br>

**npm run start:dev**<br>

Production Mode<br>
Build and run the application in production mode:<br>

**npm run start:prod**

## API Endpoints

GET api/users<br>
Get all users:<br>
GET http://localhost:3500/api/users

GET api/users/{userId}<br>
Get a specific user by ID:<br>
GET http://localhost:3500/api/users/{userId}

POST api/users<br>
Create a new user:<br>
POST http://localhost:3500/api/users<br>
Request Body:<br>
`{
"username": "John Doe",
"age": 25,
"hobbies": ["Reading", "Coding"]
}`

PUT api/users/{userId}<br>
Update an existing user by ID:<br>
PUT http://localhost:3500/api/users/{userId}<br>
Request Body:<br>
`{
"username": "John Doe",
"age": 30,
"hobbies": ["Reading", "Traveling"]
}`

DELETE api/users/{userId}<br>
Delete an existing user by ID:<br>
DELETE http://localhost:3500/api/users/{userId}

## Testing

Run tests for the API:<br>
**npm test**

Test Scenarios<br>
Get all records with a GET api/users request (expect an empty array).<br>
Create a new object by a POST api/users request (expect a response containing the newly created record).<br>
With a GET api/user/{userId} request, try to get the created record by its id (expect the created record).<br>
Try to update the created record with a PUT api/users/{userId} request (expect a response containing an updated object with the same id).<br>
With a DELETE api/users/{userId} request, delete the created object by id (confirmation of successful deletion is expected).<br>
With a GET api/users/{userId} request, try to get a deleted object by id (expected answer is that there is no such object).<br>

## Error Handling

Requests to non-existing endpoints and errors on the server side are handled appropriately with corresponding status codes and human-friendly messages.
