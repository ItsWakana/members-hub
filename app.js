const createError = require('http-errors');
const express = require('express');
const path = require('path');
const session = require("express-session");
const passport = require("passport");
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const runDatabaseConnection = require("./helper functions/databaseConnect");
const { signinAuthStrategy } = require("./controllers/authController");

const indexRouter = require("./routes/index");
const User = require('./models/User');

const app = express();

runDatabaseConnection("members-hub");

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));

passport.use(signinAuthStrategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser( async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch(err) {
    done(err);
  }
});

app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.locals.title = "Members Hub";
  next();
})
app.use("/", indexRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
