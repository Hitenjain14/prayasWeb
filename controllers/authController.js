const { promisify } = require('util');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const completedEvent = require('./../models/completedEvent');
const upcomingEvents = require('./../models/upcomingEvents');

const cookieOptions = {
  expires: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
  httpOnly: true,
};

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '60d',
  });
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

const replacePlaceHolder = (placeholder, el) => {
  let out = placeholder.replace('{%TITLE%}', el.title);
  out = out.replace('{%ID%}', el._id);
  return out;
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  if (process.env.NODE_ENV === 'production') {
    cookieOptions.secure = true;
  }

  res.cookie('jwt', token, cookieOptions);

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
};

exports.login = catchAsync(async (req, res, next) => {
  const { name, password } = req.body;
  //1) Check if email and password exist in req.body
  if (!name || !password) {
    return next(new AppError('Please enter name and password', 400));
  }
  //2) Check if user exists and password matches the email
  const user = await User.findOne({ name }).select('+password');
  if (!user || !(password === user.password)) {
    res.redirect('/loginPage.html');
    return;
  }
  //3) If everything is okay send back the response
  createSendToken(user, 200, res);
  // const token = signToken(user._id);
  // res.status(200).json({
  //   status: 'success',
  //   token,
  // });
});

exports.protect = catchAsync(async (req, res, next) => {
  //1) Getting token and check if its there
  let token;
  // let qwe = false;
  // if (req.cookies.jwt) {
  //   qwe = req.headers.authorization.startsWith('Bearer');
  // }
  // console.log(qwe);
  // if (qwe) {
  //   token = req.headers.authorization.split(' ')[1];
  // }
  token = req.cookies.jwt;
  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in again', 401)
    );
  }
  //2) Verification of token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //3) Check if user still exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(
      new AppError('The user belonging to this token no longer exists.', 401)
    );
  }
  //Grant Access to protected route
  req.user = freshUser;
  next();
});
