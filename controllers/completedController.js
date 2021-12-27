const fs = require('fs');
const completedEvent = require('./../models/completedEvent');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const replacePlaceHolder = (images, el) => {
  const out = images.replace('{%LINK%}', el.TitleImagePath);
  return out;
};

const homePage = fs.readFileSync('./public/index.html', 'utf-8');
const images = fs.readFileSync('./public/templates/sliderImages.html', 'utf-8');

exports.getAllEvents = catchAsync(async (req, res, next) => {
  const completed = await completedEvent.find();
  const out = completed.map((el) => replacePlaceHolder(images, el));
  const out_ = homePage.replace('{%SLIDER_IMAGES%}', out);
  res.writeHead(200, { 'Content-type': 'text/html' });
  res.end(out_);
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
