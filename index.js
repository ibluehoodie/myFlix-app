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
