const fs = require('fs');
const completedEvent = require('./../models/completedEvent');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const upcomingEvents = require('./../models/upcomingEvents');

const replacePlaceHolder = (placeholder, el) => {
  let out = placeholder.replace('{%TITLE%}', el.title);
  out = out.replace('{%ID%}', el._id);
  return out;
};

const replacePlaceHolder1 = (images, el) => {
  let out = images.replace('{%LINK%}', el.TitleImage);
  out = out.replace('{%ID%}', el._id);
  return out;
};

const replacePlaceHolder2 = (temp, event) => {
  let output = temp.replace(/{%LINK%}/g, event.link);
  output = output.replace(/{%TITLE%}/g, event.title);

  return output;
};
const page = fs.readFileSync('./public/admin.html', 'utf8');
const deleteNews = fs.readFileSync(
  './public/templates/deleteNews.html',
  'utf8'
);
const deleteCompleted = fs.readFileSync(
  './public/templates/deleteCompleted.html',
  'utf8'
);
const homePage = fs.readFileSync('./public/homePage.html', 'utf-8');
const images = fs.readFileSync('./public/templates/sliderImages.html', 'utf-8');
const newsPage = fs.readFileSync('./public/templates/news.html', 'utf-8');

exports.getAllEvents = catchAsync(async (req, res, next) => {
  const completed = await completedEvent.find();
  const upcoming = await upcomingEvents.find();
  const out1 = completed.map((el) => replacePlaceHolder1(images, el));
  const out2 = upcoming.map((el) => replacePlaceHolder2(newsPage, el));
  let out_ = homePage.replace('{%SLIDER_IMAGES%}', out1).split(',').join(' ');
  out_ = out_.replace('{%UPCOMING_EVENTS%}', out2).split(',').join(' ');
  res.writeHead(200, { 'Content-type': 'text/html' });
  res.end(out_);
});

exports.getAdminPage = catchAsync(async (req, res, next) => {
  const completed = await completedEvent.find();
  const upcoming = await upcomingEvents.find();
  const out1 = completed.map((el) => replacePlaceHolder(deleteCompleted, el));
  const out2 = upcoming.map((el) => replacePlaceHolder(deleteNews, el));
  let out_ = page.replace('{%COMPLETED_EVENTS%}', out1).split(',').join(' ');
  out_ = out_.replace('{%UPCOMING_EVENTS%}', out2).split(',').join(' ');

  res.writeHead(200, { 'Content-type': 'text/html' });
  res.end(out_);
});
