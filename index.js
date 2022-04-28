const express = require('express'),
  app = express();
// Use multiple modules in the same file with commas and implied variables.
const morgan = require('morgan');
app.use(morgan('common'));
const bodyParser = require('body-parser');
app.use(bodyParser.json());
// Integrate ./auth.js for authentication and authroization with HTTP and JWT.
app.use(bodyParser.urlencoded({
  extended: true
}));

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

//PUT request: Allow users to update their user details.
// Update a user's info, by username
/* We’ll expect JSON in this format
{
  Username: String, (required)
  Password: String, (required)
  Email: String, (required)
  Birthday: Date
}*/
app.put('/users/:Username', (req, res) => {
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
app.post('/users/:Username/movies/:_id', (req, res) => {
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
app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', {root: __dirname });
});

//GET requests test localhost:8080
app.get('/', (req, res) => {
  res.send('Welcome to my movie club!!');
});
// GET all users
app.get('/users', (req, res) => {
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
app.get('/users/:Username', (req, res) => {
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
app.get('/movies', (req, res) => {
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
app.get('/movies/:Title', (req, res) => {
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
app.get('/movies/genre/:Name', (req, res) => {
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
app.get('/movies/director/:Name', (req, res) => {
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
app.delete('/users/:Username/movies/:_id', (req, res) => {
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
app.delete('/users/:Username', (req, res) => {
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
// (maybe) in terminal "npm run dev".
