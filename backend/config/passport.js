// config/passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/userModel');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
},
async (email, password, done) => {
  try {
    const user = await User.findOne({ email });

    if (!user || !user.validatePassword(password)) {
      return done(null, false, { message: 'Incorrect email or password' });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
