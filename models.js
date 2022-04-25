const mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
  MovieID: String,
  Title: {type: String, required: true},
  Description: {type: String, required: true},
  GenreID: [String],
  Genre: {
    GenreID: String,
    Name: String,
    Description: String,
    Secondary_Genre: {
      GenreID: String,
      Name: String,
      Description: String
    }
  },
  Director: {
    Name: String,
    Bio: String,
    Birth_Year: String
  },
  Actors: [String],
  ImagePath: String,
  Release_Year: String,
  IMDb_Rating: Number,
  Featured: Boolean
});

let userSchema = mongoose.Schema({
  Username: {type: String, required: true},
  Password: {type: String, required: true},
  Email: {type: String, required: true},
  Birthday: Date,
  FavoriteMovies: [{type: mongoose.Schema.Types.ObjectID, ref: 'Movie'}]
});

// creates colelction in MongoDB "db.movies" under "/data/db" directory
let Movie = mongoose.model('Movie', movieSchema);
// creates colelction in MongoDB "db.users" under "/data/db" directory
let User = mongoose.model('User', userSchema);

// exports models so they can be imported to index.js and accessed by API endpoints to query the MongoDB database
module.exports.Movie = Movie;
module.exports.User = User;
