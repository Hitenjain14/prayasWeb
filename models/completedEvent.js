const mongoose = require('mongoose');

const completedEvent = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A title is required'],
  },
  content: {
    type: String,
    required: [true, 'A content is required'],
  },
  link: {
    type: String,
  },
  TitleImage: {
    type: String,
    required: [true, 'A title image is required'],
  },
  galleryImages: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Completed = mongoose.model('Completed', completedEvent);

module.exports = Completed;
