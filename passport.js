const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  Models = require('./models.js'),
  passportJWT = require('passport-jwt');

let Users = Models.User,
  JWTStrategy = passportJWT.Strategy,
  ExtractJWT = passportJWT.ExtractJwt;

// LocalStrategy = Passport strategy defining basic HTTP authentication for login requests.
passport.use(new LocalStrategy({
  usernameField: 'Username',
  passwordField: 'Password'
// strategy sends username andpassword from request body to Mongoose for database matching.
}, (username, password, callback) => {
  console.log(username + ' ' + password);
  Users.findOne({ Username: username }, (error, user) => {
    if (error) {
      console.log(error);
      return callback(error);
    }

    if (!user) {
      console.log('Incorrect username');
      return callback(null, false, {message: 'Incorrect username or password.'});
    }

    // validate any password a user enters, per bcrypt module and validatePassword() in models.js
    if (!user.validatePassword(password)) {
      console.log('incorrect password');
      return callback(null, false, {message: 'Incorrect password.'});
    }

    console.log('complete');
    return callback(null, user);
  });
}));

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_jwt_secret'
}, (jwtPayload, callback) => {
  return Users.findById(jwtPayload._id)
  .then((user) => {
    return callback(null, user);
  })
  .catch((error) => {
    return callback(error)
  });
}));
