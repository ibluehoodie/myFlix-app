const express = require('express'),
//Use multiple modules in the same file with commas and implied variables
morgan = require('morgan');

const app = express();

app.use(morgan('common'));

//GET requests
app.get('/', (req, res) => {
  res.send('Welcome to my movie club!');
});
//same result as:
// response.writeHead(200, {'Content-Type': 'text/plain'});
// response.end('Welcome to my book club!\n');

//structure = app.METHOD(PATH, HANDLER) PATH = endpoint URL, HANDLER = function to be executed when route is matched;
app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', {root: __dirname });
});

app.get('/movies', (req, res) => {
  res.json(topMovies);
});

