const express = require('express'),
  app = express(),
//Use multiple modules in the same file with commas and implied variables
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');

app.use(morgan('common'));

app.use(bodyParser.json());

let users = [
  {
    id: 1,
    name: "Max",
    favoriteMovies: ["The Shawshank Redemption"]
  },
  {
    id: 2,
    name: "Moritz",
    favoriteMovies: ["The Godfather", "12 Angry Men"]
  },
  {
    id: 3,
    name: "Lola",
    favoriteMovies: []
  }
];

//movie data borrowed from Bmcgaughan for testing purposes
let movies = [
  {
    Title: 'The Shawshank Redemption',
    Director: 'Frank Darabont',
    Stars: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton'],
    Genre: {
      Name: 'Drama',
      Description: 'a heartwarming escape story'
    },
  },
  {
    Title: 'The Godfather',
    Director: 'Frances Ford Coppola',
    Stars: ['Marlon Brando', 'Al Pacino', 'James Caan'],
    Genre: 'Crime',
  },
  {
    Title: 'The Dark Knight',
    Director: 'Christopher Nolan',
    Stars: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
    Genre: 'Action',
  },
  {
    Title: 'The Godfather: Part II',
    Director: 'Francis Ford Coppola',
    Stars: ['Al Pacino', 'Robert De Niro', 'Robert Duvall'],
    Genre: 'Crime',
  },
  {
    Title: '12 Angry Men',
    Director: 'Sidney Lumet',
    Stars: ['Henry Fonda', 'Lee J. Cobb', 'Martin Balsam'],
    Genre: 'Drama',
  },
  {
    Title: "Schindler's List",
    Director: 'Steven Spielberg',
    Stars: ['Liam Neeson', 'Ralph Fiennes', 'Ben Kingsley'],
    Genre: 'History',
  },
  {
    Title: 'The Lord of the Rings: The Return of the King',
    Director: 'Peter Jackson',
    Stars: ['Elijah Wood', 'Viggo Mortensen', 'Ian McKellen'],
    Genre: 'Fantasy',
  },
  {
    Title: 'Pulp Fiction',
    Director: 'Quentin Tarantino',
    Stars: ['John Travolta', 'Uma Thurman', 'Samuel L. Jackson'],
    Genre: 'Crime',
  },
  {
    Title: 'The Lord of the Rings: The Fellowship of the Ring',
    Director: 'Peter Jackson',
    Stars: ['Elijah Wood', 'Orlando Bloom', 'Ian McKellen'],
    Genre: 'Fantasy',
  },
  {
    Title: 'The Good, the Bad and the Ugly',
    Director: 'Sergio Leone',
    Stars: ['Clint Eastwood', 'Eli Wallach', 'Lee Van Cleef'],
    Genre: 'Western',
  }
];

// let topMovies = [
//   {
//   title: 'Alien',
//   },
//   {
//   title: 'Dune'
//   },
//   {
//   title: 'Star Wars'
//   },
//   {
//   title: 'Starship Troopers'
//   },
//   {
//   title: 'The Thing'
//   },
//   {
//   title: 'Interstellar'
//   }
// ];


//CREATE-POST requests: Allow new users to register
app.post('/users', (req, res) => {
  const newUser = req.body /* made possible because of body-parser middleware reading data form body object */
  if (newUser.name) {
    newUser.id = uuid.v4(); /* use uuid to create unique id# for .id property attached to newUser object */
    users.push(newUser);
    res.status(201).json(newUser)
  } else {
    res.status(400).send('users neeed names');
  }
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

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something is darned broke!');
});

//listen for requests
app.listen(8080, () => {
  console.log('Your app is running on port 8080.');
});

// const http = require('http');

// http.createServer((request, response) => {
//   response.writeHead(200, {'Content-Type': 'text/plain'});
//   response.end('Welcome to my movie club!\n');
// }).listen(8080);
//
// console.log('My first Node test server is running on Port 8080.');
