const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const cors = require('cors')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const companyRouter = require('./routes/company');
const staffRouter = require('./routes/staff');
const shopRouter = require('./routes/shop');
const config = require('./config/index');

// import middleware
const errorHandler = require('./middleware/errorHandlers')
const app = express();

const limiter = rateLimit({
  windowMs: 10 * 1000, // 10 minutes
  max: 5 // limit each IP to 100 requests per windowMs
});

app.use(cors())
app.use(passport.initialize())
app.use(helmet())
app.use(limiter)

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.use(logger('dev'));
app.use(express.json({
  limit: '50mb'
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/company', companyRouter);
app.use('/shop', shopRouter);
app.use('/staff', staffRouter);

//Use middleware
app.use(errorHandler)

module.exports = app;
