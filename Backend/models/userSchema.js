const mongoose = require('mongoose');

//Define Schema
const userSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });
  
// Create the model
const User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;
  