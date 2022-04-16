const express = require('express'),
  app = express(),
//Use multiple modules in the same file with commas and implied variables
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');

app.use(morgan('common'));

app.use(bodyParser.json());

//use express.static to route all requests for static files to corresponding files within selected folder (public);
app.use(express.static('public'));

let topMovies = [
  {
  title: 'Alien'
  },
  {
  title: 'Dune'
  },
  {
  title: 'Star Wars'
  },
  {
  title: 'Starship Troopers'
  },
  {
  title: 'The Thing'
  },
  {
  title: 'Interstellar'
  }
];

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
