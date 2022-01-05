const fs = require('fs');
const completedEvent = require('./../models/completedEvent');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

// const replacePlaceHolder = (images, el) => {
//   let out = images.replace('{%LINK%}', el.TitleImage);
//   return out;
// };
//
// const homePage = fs.readFileSync('./public/homePage.html', 'utf-8');
// const images = fs.readFileSync('./public/templates/sliderImages.html', 'utf-8');
//
// exports.getAllEvents = catchAsync(async (req, res, next) => {
//   console.log('all events in completed');
//   const completed = await completedEvent.find();
//   const out = completed.map((el) => replacePlaceHolder(images, el));
//   console.log(out);
//   const out_ = homePage.replace('{%SLIDER_IMAGES%}', out).split(',').join(' ');
//   res.writeHead(200, { 'Content-type': 'text/html' });
//   res.end(out_);
// });

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

  await completedEvent.findByIdAndDelete(id);

  // res.status(204).json({
  //   status: 'success',
  //   data: null,
  // });
  res.redirect('/adminPage');
});

exports.newEvent = catchAsync(async (req, res, next) => {
  // console.log(req.file);
  if (!req.file) {
    return next(new AppError('Image is required'), 404);
  }
  let pth = req.file.path;
  let v = './../';
  pth = v + pth;
  console.log(pth);
  req.body.TitleImagePath = pth;
  req.body.TitleImage = req.file.filename;
  const completed = await completedEvent.create(req.body);

  // res.status(201).json({
  //   status: 'success',
  //   data: {
  //     completed,
  //   },
  // });
  res.redirect('/adminPage');
});
