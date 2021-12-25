const upcomingEvents = require('./../models/upcomingEvents');

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const completedEvent = require('./../models/completedEvent');

exports.getAllEvents = catchAsync(async (req, res, next) => {
  const completed = await completedEvent.find();

  res.status(200).json({
    status: 'success',
    data: {
      completed,
    },
  });
});

exports.newEvent = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const completed = await completedEvent.findById(id);

  res.status(200).json({
    status: 'success',
    data: {
      completed,
    },
  });
});

exports.deleteEvent = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const completed = await completedEvent.findByIdAndDelete(id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
