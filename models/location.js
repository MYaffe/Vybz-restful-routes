// Load MongoDB driver
var mongoose = require('mongoose');
 
// Define our location schema
var LocationSchema = new mongoose.Schema({
  longitude: Number,
  latitude: Number,
  vybe: Boolean,
  vybz: Number,
  //eventually, we'll have to turn userId into an array,
  // since there will be many users in 1 location
  userId: String
});
 
// We bind the Location model to the LocationSchema
module.exports = mongoose.model('Location', LocationSchema);
