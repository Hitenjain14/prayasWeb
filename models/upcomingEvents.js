const mongoose = require('mongoose');

const upcomingEvents = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A title is required'],
  },
  link: {
    type: String,
    required: [true, 'A link is required'],
  },
});

const Upcoming = mongoose.model('Upcoming', upcomingEvents);

module.exports = Upcoming;
