const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const User = require('../../models/User');

passport.use(new LocalStrategy((username, password, done) => {

    const usernameRegex = new RegExp(username,"ig")
    User.findOne({username: usernameRegex}, (err, user) => {

      if (err) return done(err, null, "An error occured!");
      if (!user) return done(null, false, "User not found.");

      if (password === user.password) {
        //  req.user
        return done(null, user, "Logged In.");
    } else {
        return done(null, false, "Incorrect password.");
    }
    });

}));

passport.serializeUser(function(user, done) {
    done(null, user._id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });