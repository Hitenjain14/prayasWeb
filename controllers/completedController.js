const completedEvent = require('./../models/completedEvent');

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllEvents = catchAsync(async (req, res, next) => {
  const completed = await completedEvent.find();

  res.status(200).json({
    status: 'success',
    data: {
      completed,
    },
  });
});

exports.getEvent = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const completed = await completedEvent.findById(id);

  res.status(200).json({
    status: 'success',
    data: {
      completed,
    },
  });
});

exports.deleteCompleted = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const completed = await completedEvent.findByIdAndDelete(id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.newEvent = catchAsync(async (req, res, next) => {
  const completed = await completedEvent.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      completed,
    },
  });
});
