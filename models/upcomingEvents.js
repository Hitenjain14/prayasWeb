const mongoose = require('mongoose');

const upcomingEvents = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A title is required'],
  },
  link: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Upcoming = mongoose.model('Upcoming', upcomingEvents);

module.exports = Upcoming;
