const express = require('express'),
//Use multiple modules in the same file with commas and implied variables
morgan = require('morgan');

const app = express();

app.use(morgan('common'));

