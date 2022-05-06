const mongoose = require('mongoose');
// hashing module for passwords.
const bcrypt = require('bcrypt');

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

// password function for actually hashing passwords.
userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

// password function for comparing submitted hashed passwords with hashed passwords in database.
userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.Password);
};

// creates colelction in MongoDB "db.movies" under "/data/db" directory
let Movie = mongoose.model('Movie', movieSchema);
// creates colelction in MongoDB "db.users" under "/data/db" directory
let User = mongoose.model('User', userSchema);

// exports models so they can be imported to index.js and accessed by API endpoints to query the MongoDB database
module.exports.Movie = Movie;
module.exports.User = User;
