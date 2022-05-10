const express = require('express'),
  app = express();
// Use multiple modules in the same file with commas and implied variables.
const morgan = require('morgan');
// Morgan middleware library for logging requests.
app.use(morgan('common'));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
// Integrate ./auth.js for authentication and authroization with HTTP and JWT.
app.use(bodyParser.urlencoded({
  extended: true
}));

const uuid = require('uuid');

// import server-side input validation module.
const {check, validationResult} = require('express-validator');

// requires Mongoose npm package, models.js file, and models defined in models.js file.
const mongoose = require('mongoose');
const Models = require('./models.js');
// local databse connection.
// mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });
// online database connection to MongoDB Atlas.
mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });


const Movies = Models.Movie;
const Users = Models.User;

// middleware uses
//use express.static to route all requests for static files to corresponding files within selected folder (Public);
app.use(express.static('public'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something is darned broke!');
});

// keep above "auth" import.Initialize cors.
const cors = require('cors');
app.use(cors());
// Define allowed domains for cors.
let allowedOrigins = ['http://localhost:8080', 'http://testsite.com'];

app.use(cors({
  origin: (origin, callback) => {
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){ // If a specific origin isn't found on the list of allowed origins.
    let message = 'The CORS policy for this application doesn\'t allow access from origin ' + origin;
      return callback(new Error(message ), false);
    }
    return callback(null, true);
  }
}));

// import auth.js file.
let auth = require('./auth')(app); // passing (app) argument makes Express available in auth.js.
// import passport.js and require passport module from npm.
const passport = require('passport');
require('./passport');

// NEW MONGOOSE CRUD OPERATIONS

// CREATE in Mongoose: add a user
app.post('/users',
  // Validation logic here for request
  //you can either use a chain of methods like .not().isEmpty()
  //which means "opposite of isEmpty" in plain english "is not empty"
  //or use .isLength({min: 5}) which means
  //minimum value of 5 characters are only allowed.
  [
    check('Username', 'Username is required').isLength({min: 6}),
      check('Username', 'Username contains non-alphanumeric characters - not allowed.').isAlphanumeric(),
      check('Password', 'Password is required').not().isEmpty(),
      check('Email', 'Email does not appear to be valid').isEmail()
], (req, res) => {

  // check the validation object for errors.
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  };

  // insert hashing code based on hashPassword in models.js
  let hashedPassword = Users.hashPassword(req.body.Password);
  // use findOne to check "Users" model for existing username.
  Users.findOne({ 'Username': req.body.Username })
  .then((user) => {
    if (user) {
      return res.status(400).send(req.body.Username + ' already exists');
    } else {
  // format for Mongoose to CREATE: populate a new user document with data sent in the HTTP request body.
      Users.create({
        Username: req.body.Username,
        // update with hashed Password.
        Password: hashedPassword,
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

//PUT request: Allow users to update their user details.
// Update a user's info, by username
/* We’ll expect JSON in this format
{
  Username: String, (required)
  Password: String, (required)
  Email: String, (required)
  Birthday: Date
}*/
app.put('/users/:Username', passport.authenticate('jwt', {session: false}), [
  check('Username', 'Username is required').isLength({min: 7}),
    check('Username', 'Username contains non-alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail()
], (req, res) => {
  // insert hashing code based on hashPassword in models.js
  let hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOneAndUpdate({ Username: req.params.Username},
    { $set: {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true }, //This line ensures that the updated document is returned.
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

// POST request: add a movie to a user's list of favorites
app.post('/users/:Username/movies/:_id', passport.authenticate('jwt', {session: false}), (req, res) => {
  let hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOneAndUpdate({ Username: req.params.Username }, {
    $push: {FavoriteMovies: req.params._id } // use $addToSet to add element that won't duplicate if already in the array.
  },
  { new: true }, // This line ensures that the updated document is returned.
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

// READ in Mongoose
// GET documentation page: structure = app.METHOD(PATH, HANDLER) PATH = endpoint URL, HANDLER = function to be executed when route is matched;
app.get('/documentation', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.sendFile('public/documentation.html', {root: __dirname });
});

//GET requests test localhost:8080
app.get('/', (req, res) => {
  res.send('Welcome to my movie club!!');
});
// GET all users
app.get('/users', passport.authenticate('jwt', {session: false}), (req, res) => {
// query "Users" model for all documents within the collection instead of database: db.users.find().
  Users.find()
  .then((users) => {
    res.status(201).json(users);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

// GET a user by username.
app.get('/users/:Username', passport.authenticate('jwt', {session: false}), (req, res) => {
  Users.findOne({ Username: req.params.Username })
  .then((user) => {
    res.json(user);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

// GET a list of ALL movies.
app.get('/movies', passport.authenticate('jwt', {session: false}), (req, res) => {
Movies.find()
  .then((movies) => {
  res.status(200).json(movies);
  })
  .catch((err) => {
  console.error(err);
  res.status(500).send('Error: ' + error);
  });
});

// GET a movie by title.
app.get('/movies/:Title', passport.authenticate('jwt', {session: false}), (req, res) => {
  Movies.findOne({ 'Title': req.params.Title })
  .then((movie) => {
    if(movie){
      res.status(200).json(movie);
    }else{
      res.status(400).send('Movie not on record.');
    };
  })
  .catch((err) => {
    res.status(500).send('Error: ' + err);
  });
});

// GET requests: Return descriptive data about a genre by genre name
app.get('/movies/genre/:Name', passport.authenticate('jwt', {session: false}), (req, res) => {
  Movies.findOne({ 'Genre.Name': req.params.Name})
  .then((movie) => {
    if(movie){
      res.status(200).json(movie.Genre.Description);
    } else {
      res.status(400).send('Genre not on record');
  };
})
  .catch((err) => {
    res.status(500).send('Error: ' + err);
  });
});

//GET requests: Return data about a director by name
app.get('/movies/director/:Name', passport.authenticate('jwt', {session: false}), (req, res) => {
  Movies.findOne({ 'Director.Name': req.params.Name})
  .then((movie) => {
    if(movie){
      res.status(200).json(movie.Director);
    } else {
      res.status(400).send('Director not on record');
  };
  })
  .catch((err) => {
    res.status(500).send('Error: ' + err);
  });
});

//DELETE in Mongoose
//// DELETE request: remove a movie from a user's list of favorites.
app.delete('/users/:Username/movies/:_id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
    $pull: {FavoriteMovies: req.params._id }
  },
  { new: true }, // This line ensures that the updated document is returned.
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

//DELETE request: Allow existing users to deregister
app.delete('/users/:Username', passport.authenticate('jwt', {session: false}), (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
  .then((user) => {
    if (!user) {
      res.status(400).send(req.params.Username + ' was not found.');
    } else {
      res.status(200).send(req.params.Username + ' was deleted.');
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});


// listen for requests
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
  console.log('Listening on Port ' + port);
});
// app.listen(8080, () => {
//   console.log('Your app is running on port 8080.');
// });

// (maybe) in terminal "npm run dev".
