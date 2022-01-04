const fs = require('fs');
const completedEvent = require('./../models/completedEvent');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const upcomingEvents = require('./../models/upcomingEvents');

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
