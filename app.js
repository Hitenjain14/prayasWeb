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

app.use(express.static(`${__dirname}/public`));

//Data sanitization against NoSQL query injection
app.use(mongoSanitize());
app.use(xss());

const completedEvent = require('./routes/completedEvents');
const upcomingEvent = require('./routes/upcomingEvent');
const userRouter = require('./routes/userRouter');

app.use('/homePage', upcomingEvent);
app.use('/homePage', completedEvent);
app.use('/adminLogin', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
