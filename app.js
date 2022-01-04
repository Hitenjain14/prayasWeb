const express = require('express');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const path = require('path');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));
// Set security http headers
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(express.urlencoded({ extended: false }));
//Body parser to read data from body(req.body) can restrict amount of data by app.use(express.json({limit : '10kb'}));
app.use(express.json());

app.use(express.static(__dirname + '/public'));

//Data sanitization against NoSQL query injection
app.use(mongoSanitize());
app.use(xss());

const completedEvent = require('./routes/completedEvents');
const upcomingEvent = require('./routes/upcomingEvent');
const userRouter = require('./routes/userRouter');
const allRouter = require('./routes/allRouter');

app.use('/completed', completedEvent);
app.use('/upcoming', upcomingEvent);
app.use('/', allRouter);
app.use('/adminLogin', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
