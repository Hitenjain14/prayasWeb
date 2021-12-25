const express = require('express');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.use(express.json());

//Set security http headers
app.use(helmet());
//Body parser to read data from body(req.body) can restrict amount of data by app.use(express.json({limit : '10kb'}));
app.use(express.json());

//Data sanitization against NoSQL query injection
app.use(mongoSanitize());
app.use(xss());

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests form this IP, please try again in an hour!',
});

app.all('*', (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
