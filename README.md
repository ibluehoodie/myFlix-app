# myFlix-app
Server-side component of a “movies” web application. The web
application will provide users with access to information about different
movies, directors, and genres. Users will be able to sign up, update their
personal information, and create a list of their favorite movies.

## Description:
This project using HTML, CSS, and Javascript to develop a simple app that loads and presents data from an external API. The user is able to select specific data for detailed viewing.
Additionally, the app has a navigator to direct the user to external websites with official and fan-created content related to the API.

## Essential Features
-Return a list of ALL movies to the user
-Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the user
-Return data about a genre (description) by name/title (e.g., “Thriller”)
-Return data about a director (bio, birth year, death year) by name
-Allow new users to register
-Allow users to update their user info (username, password, email, date of birth)
-Allow users to add a movie to their list of favorites
-Allow users to remove a movie from their list of favorites
-Allow existing users to deregister

## Technical Requirements
-The API must be a Node.js and Express application.
-The API must use REST architecture, with URL endpoints corresponding to the data operations listed above
-The API must use at least three middleware modules, such as the body-parser package for reading data from requests and morgan for logging.
-The API must use a “package.json” file.
-The database must be built using MongoDB.
-The business logic must be modeled with Mongoose.
-The API must provide movie information in JSON format.
-The JavaScript code must be error-free.
-The API must be tested in Postman.
-The API must include user authentication and authorization code.
-The API must include data validation logic.
-The API must meet data security regulations.
-The API source code must be deployed to a publicly accessible platform like GitHub.
-The API must be deployed to Heroku.

## Dependencies
node.js
bcryptjs
body-parser
cors
express
express-validator
jsonwebtoken
mongoose
morgan
passport
passport-jwt
passport-local
uuid
nodemon

## Technologies
-mongoDB
-mongoDB Atlas
