const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
const { loginUser, restoreUser } = require('../../config/passport');
const { isProduction } = require('../../config/keys');
const validateRegisterInput = require('../../validations/register');
const validateLoginInput = require('../../validations/login');

router.get('/', function (req, res, next) {
  res.json({
    message: 'GET /api/users',
  });
});

router.post(
  '/register',
  validateRegisterInput,
  async (req, res, next) => {
    const standardizedUsername = req.body.username.toLowerCase();
    const standardizedEmail = req.body.email.toLowerCase();

    const user = await User.findOne({
      $or: [
        { email: standardizedEmail },
        { username: standardizedUsername },
      ],
    });

    if (user) {
      const err = new Error('Validation Error');
      err.statusCode = 400;
      const errors = {};
      if (user.email.toLowerCase() === standardizedEmail) {
        errors.email =
          'A user has already registered with this email';
      }
      if (user.username.toLowerCase() === standardizedUsername) {
        errors.username =
          'A user has already registered with this username';
      }
      err.errors = errors;
      return next(err);
    }

    const newUser = new User({
      username: standardizedUsername,
      email: standardizedEmail,
    });

    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(
        req.body.password,
        salt,
        async (err, hashedPassword) => {
          if (err) throw err;
          try {
            newUser.hashedPassword = hashedPassword;
            const user = await newUser.save();
            return res.json(await loginUser(user));
          } catch (err) {
            next(err);
          }
        }
      );
    });
  }
);

router.post('/login', validateLoginInput, async (req, res, next) => {
  passport.authenticate('local', async function (err, user) {
    if (err) return next(err);
    if (!user) {
      const err = new Error('Invalid credentials');
      err.statusCode = 400;
      err.errors = { email: 'Invalid credentials' };
      return next(err);
    }
    return res.json(await loginUser(user));
  })(req, res, next);
});

router.get('/current', restoreUser, (req, res) => {
  if (!isProduction) {
    const csrfToken = req.csrfToken();
    res.cookie('CSRF-TOKEN', csrfToken);
  }
  if (!req.user) return res.json(null);
  res.json({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
  });
});

module.exports = router;