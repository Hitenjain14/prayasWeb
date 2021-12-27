const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A name is required'],
  },
  password: {
    type: String,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
