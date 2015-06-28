//This file will be useful for when we want to 'reauthorize' users
var passport = require('passport');

var BasicStrategy = require('passport-http').BasicStrategy;
var User = require ('../models/user');

passport.use(new BasicStrategy(
	function(username, password, next){
		User.findOne({username:username,}, function (err, user) {
			if (err) { return next(err); }
 
 // if no user is found, stop the call chain but no error message
			if (!user) { return next(null,false); }

			user.verifyPassword(password, function (err, isMatch) {
			if (err) {return next(err); }

			if (!isMatch) { return next (null,false); }

			return next (null,user);
			});
    });
  }
));


//When a user is authenticated, a token is stored and used for each request for the remainder of the session. 
//By setting session to false we prevent that from happening when we call the 'isAuthenticated method'. Makes sense?
exports.isAuthenticated = passport.authenticate('basic', { session : false });