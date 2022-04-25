const express = require('express'),
  app = express();
// Use multiple modules in the same file with commas and implied variables.
const morgan = require('morgan');
app.use(morgan('common'));
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const uuid = require('uuid');
// requires Mongoose npm package, models.js file, and models defined in models.js file.
const mongoose = require('mongoose');
const Models = require('./models.js');
mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });

const Movies = Models.Movie;
const Users = Models.User;

// NEW MONGOOSE CRUD OPERATIONS

// CREATE in Mongoose
// Post: add a user
/* Expect JSON in this format:
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/
app.post('/users', (req, res) => {
  // use findOne to check "Users" model for existing username.
  Users.findOne({ 'Username': req.body.Username })
  .then((user) => {
    if (user) {
      return res.status(400).send(req.body.Username + ' already exists');
    } else {
  // format for Mongoose to CREATE: populate a new user document with data sent in the HTTP request body.
      Users.create({
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
        FavoriteMovies: req.body.FavoriteMovies
      })
  // test functionality in Postman by sending POST request to "/users" endpoint.
      .then((user) => {res.status(201).json(user) })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      })
    }
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});

//CREATE-POST request: Allow users to add a movie to their list of favorites
app.post('/users/:id/:movieTitle', (req, res) => {
  const {id, movieTitle} = req.params; /* Object Destructuring syntax */

  let user = users.find( user => user.id == id); //search MDN "casting" for alternative

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to user ${id}'s favorites.`);
  } else {
    res.status(400).send('no user by this name found')
  }
});

//READ-GET requests
app.get('/', (req, res) => {
  res.send('Welcome to my movie club!!');
});

//structure = app.METHOD(PATH, HANDLER) PATH = endpoint URL, HANDLER = function to be executed when route is matched;
app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', {root: __dirname });
});

//READ-GET requests: Return a list of ALL movies to the user
app.get('/movies', (req, res) => {
  res.status(200).json(movies);
});

//READ-GET requests: Return data about a single movie by title to the user
app.get('/movies/:title', (req, res) => {
  // const title = req.params.title
  const {title} = req.params; //same as previous but with Object Destructuring syntax
  const movie = movies.find(movie => movie.Title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send('movie not on record')
  }
});

//READ-GET requests: Return data about a genre by name/title
app.get('/movies/genre/:genreName', (req, res) => {
  const {genreName} = req.params;
  const genre = movies.find(movie => movie.Genre.Name === genreName).Genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send('genre not on record')
  }
});

//READ-GET requests: Return data about a director by name
app.get('/movies/directors/:directorName', (req, res) => {
  const {directorName} = req.params;
  const director = movies.find(movie => movie.Director === directorName).Director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send('director not on record')
  }
});

//UPDATE-PUT request: Allow users to update their user username
app.put('/users/:id', (req, res) => {
  const {id} = req.params; /* Object Destructuring syntax */
  const updatedUser = req.body;

  let /* not const bc there can be multiple new users */ user = users.find( user => user.id == id); //search MDN "casting" for alternative

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send('no user by this name found')
  }
});

//DELETE request: Allow users to remove a movie from their list of favorites
app.delete('/users/:id/:movieTitle', (req, res) => {
  const {id, movieTitle} = req.params; /* Object Destructuring syntax */

  let user = users.find( user => user.id == id);

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter(title => title !== movieTitle); //preserves favorite movies EXCEPT the given title
    res.status(200).send(`${movieTitle} has been removed from user ${id}'s favorites.`);
  } else {
    res.status(400).send('no user by this name found')
  }
});

//DELETE request: Allow existing users to deregister
app.delete('/users/:id', (req, res) => {
  const {id} = req.params; /* Object Destructuring syntax */

  let user = users.find( user => user.id == id);

  if (user) {
    users = users.filter(user => user.id != id); //preserves users EXCEPT the given id. != bc comparing string to a number.
    // res.json(users); *test if filter works*
    res.status(200).send(`User ${id} has been removed from user database`);
  } else {
    res.status(400).send('no user by this name found')
  }
});

//use express.static to route all requests for static files to corresponding files within selected folder (Public);
app.use(express.static('public'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something is darned broke!');
});

//listen for requests
app.listen(8080, () => {
  console.log('Your app is running on port 8080.');
});
