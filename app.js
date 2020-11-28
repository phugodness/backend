const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const mysql = require('mysql');
const compression = require('compression');
// const cors = require('cors');

// ------Init------
const app = express();

// ------Middlewares------
// app.use(cors());
app.use(compression());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ------Routes------
// app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.get('/alligator', (req, res) => {
  const animal = 'alligator';
  // Send a text/html file back with the word 'alligator' repeated 1000 times
  res.json({ animal: animal.repeat(1000) });
});

// ------Errors------
app.use((req, res, next) => {
  next(createError(404));
});
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
