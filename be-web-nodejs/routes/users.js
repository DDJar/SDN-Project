var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var User = require('../models/users');
var passport = require('passport');
router.use(bodyParser.json());
var authenticate = require('../authenticate');
const cors = require('./cors');
const bcrypt = require('bcrypt');
// task 3 ass3
router.get('/', cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
  User.find({})
    .then((user) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(user);
    }, (err) => next(err))
    .catch((err) => next(err));
});
router.post('/signup', cors.corsWithOptions, (req, res, next) => {
  const { firstName, lastName, email, phone, passwords } = req.body;

  // Hash the password
  bcrypt.hash(passwords, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: 'Error hashing the password.' });
    }

    // Create a new user with the hashed password
    const newUser = new User({
      firstName,
      lastName,
      email,
      phoneNumber: phone,
      passwords: hash, 
    });

    newUser.save()
      .then((user) => {
        const token = authenticate.getToken({ _id: user._id });
        res.status(200).json({
          success: true,
          token,
          status: 'Registration Successful!',
          username: user.lastName+" "+user.firstName,
        });
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  });
});
router.post('/login', cors.corsWithOptions, (req, res, next) => {
  const loginValue = req.body.emailOrPhone;
  function isEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }
  const loginField = isEmail(loginValue) ? 'email' : 'phoneNumber';
  console.log(loginField +" "+loginValue )
  User.findOne({ [loginField]: loginValue })
    .then((user) => {
      console.log(user)
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication failed',
          info: 'User not found'
        });
      }
      var token = authenticate.getToken({ _id: user._id });

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({ success: true, token: token, status: 'Login Successful!', username: user.username });
    })
    .catch((err) => {
      next(err);
    });
});
router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    delete req.headers.authorization
    res.json({ success: true, status: 'Logout Successful!' });
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});

router.get('/facebook/token', passport.authenticate('facebook-token'), (req, res) => {
  if (req.user) {
    var token = authenticate.getToken({ _id: req.user._id });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ success: true, token: token, status: 'You are successfully logged in!' });
  }
});



module.exports = router;
