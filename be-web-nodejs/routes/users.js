var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var User = require('../models/users');
var passport = require('passport');
router.use(bodyParser.json());
var authenticate = require('../authenticate');
const cors = require('./cors');

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
  User.register(new User({ username:  req.body.lastname +" " +req.body.firstname  }),
    req.body.password, (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({ err: err });
      }
      else {
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.email = req.body.email;
        user.phoneNumber = req.body.phone;
        user.password = req.body.password
        user.save().then(users => {
              var token = authenticate.getToken({ _id: users._id });
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json({ success: true, token: token, status: 'Registration Successful!',username: users.username });
        }).catch(err => {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({ err: err });
        });;
      }
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
