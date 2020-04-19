const express = require('express');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./routes/api/users');

const mongoose = require('mongoose');
mongoose
  .connect(
    'mongodb+srv://praveen:eZiOGgRkWSlHdRmn@cluster0-yvyyk.mongodb.net/test?retryWrites=true&w=majority',
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected...!'))
  .catch((err) => console.log(err));

app.use(passport.initialize());

passport.use(
  new LocalStrategy(function (username, password, done) {
    User.find({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  })
);

app.get('/', (req, res) => {
  res.send('hello world');
});

app.post('/post', (req, res) => {
  res.send({
    title: 'welcome',
  });
});

app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: false,
  }),
  (req, res) =>
    res.send({
      title: 'welcome',
    })
);

const port = 3000;
app.listen(port, console.log(`Listening on ${port}`));
