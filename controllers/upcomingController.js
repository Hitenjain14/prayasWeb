const fs = require('fs');
const upcomingEvents = require('./../models/upcomingEvents');

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const completedEvent = require('./../models/completedEvent');

// const replacePlaceHolder = (temp, event) => {
//   let output = temp.replace(/{%LINK%}/g, event.link);
//   output = output.replace(/{%TITLE%}/g, event.title);
//
//   return output;
// };
//
// const homePage = fs.readFileSync('./public/homePage.html', 'utf-8');
// const newsPage = fs.readFileSync('./public/templates/news.html', 'utf-8');
//
// exports.getAllEvents = catchAsync(async (req, res, next) => {
//   console.log('in upcomingEvent');
//   const completed = await upcomingEvents.find();
//
//   const out = completed.map((el) => replacePlaceHolder(newsPage, el));
//   console.log(out);
//   const out_ = homePage
//     .replace('{%UPCOMING_EVENTS%}', out)
//     .split(',')
//     .join(' ');
//
//   res.writeHead(200, { 'Content-type': 'text/html' });
//   res.end(out_);
// });

exports.addEvent = catchAsync(async (req, res, next) => {
  const new_ = await upcomingEvents.create(req.body);
  res.status(200).json({
    status: 'success',
    data: {
      new_,
    },
  });
});

exports.deleteEvent = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const completed = await upcomingEvents.findByIdAndDelete(id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
