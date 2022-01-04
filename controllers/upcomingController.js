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
const page = fs.readFileSync('./public/admin.html', 'utf8');
const deleteNews = fs.readFileSync(
  './public/templates/deleteNews.html',
  'utf8'
);
const deleteCompleted = fs.readFileSync(
  './public/templates/deleteCompleted.html',
  'utf8'
);

const replacePlaceHolder = (placeholder, el) => {
  let out = placeholder.replace('{%TITLE%}', el.title);
  out = out.replace('{%ID%}', el._id);
  return out;
};

exports.addEvent = catchAsync(async (req, res, next) => {
  const new_ = await upcomingEvents.create(req.body);
  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     new_,
  //   },
  // });
  res.redirect('/adminPage');
});

exports.deleteEvent = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  await upcomingEvents.findByIdAndDelete(id);
  // const completed = await completedEvent.find();
  // const upcoming = await upcomingEvents.find();
  // const out1 = completed.map((el) => replacePlaceHolder(deleteCompleted, el));
  // const out2 = upcoming.map((el) => replacePlaceHolder(deleteNews, el));
  // let out_ = page.replace('{%COMPLETED_EVENTS%}', out1).split(',').join(' ');
  // out_ = out_.replace('{%UPCOMING_EVENTS%}', out2).split(',').join(' ');
  //
  // res.writeHead(200, { 'Content-type': 'text/html' });
  // res.end(out_);
  res.redirect('/adminPage');
});
