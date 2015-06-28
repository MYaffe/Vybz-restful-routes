var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
 
var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
   gender: {
  type: String,
  required: true
  },
  password: {
    type: String,
    required: true
  }
});
 // Execute before each user.save() call
UserSchema.pre('save', function(next) {
  var user = this;
 //if user edits their password we'll need to hash it
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return next(err);
    
    // not sure what 'null' does
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});
 
UserSchema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};
 
 
module.exports = mongoose.model('User', UserSchema);
