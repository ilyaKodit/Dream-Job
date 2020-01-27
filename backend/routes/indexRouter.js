/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const withAuth = require('../middleware/middleware');

const router = express.Router();

const secret = 'mysecretsshhh';

// const bcrypt = require('bcrypt');
// const { sessionChecker } = require('../middleware/auth');
// const saltRounds = 10;

const User = require('../models/user');
const Feedback = require('../models/feedback');
const Company = require('../models/company');

router.get('/', async (req, res) => {
  res.json({ test: 'hello bro!' });
});

router.get('/companies', async (req, res) => {
  const allCompanies = await Company.find();
  res.json(allCompanies);
});

// router.post('/log', async (req, res) => {
//   const { login, password } = req.body;
//   const newUser = await User.findOne({ login });

//   if (newUser && newUser.password === password) {
//     // req.session.user = newUser;
//     res.json({ id: newUser._id, login: newUser.login });
//   }
//   // } else res.json({ status: false })
// });

router.post('/reg', async (req, res) => {
  console.log(req.body);
  const existenceUser = await User.findOne({ email: req.body.email });
  if (!existenceUser) {
    const { login, email, pass } = req.body;
    // const newUser = new User({ login, email, pass });

    const newUser = new User({
      login,
      password: pass,
      email,
    });

    // user.save(function(err) {
    //   if (err) {
    //     res.status(500)
    //       .send("Error registering new user please try again.");
    //   } else {
    //     res.status(200).send("Welcome to the club!");
    //   }

    newUser.save().then(data => {
      res.json(data._id);
    });
  }
});

router.post('/api/authenticate', (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err) {
      console.error(err);
      res.status(500).json({
        error: 'Internal error please try again',
      });
    } else if (!user) {
      res.status(401).json({
        error: 'Incorrect email or password',
      });
    } else {
      user.isCorrectPassword(password, (err, same) => {
        if (err) {
          res.status(500).json({
            error: 'Internal error please try again',
          });
        } else if (!same) {
          res.status(401).json({
            error: 'Incorrect email or password',
          });
        } else {
          // Issue token
          const payload = { email };
          const token = jwt.sign(payload, secret, {
            expiresIn: '1h',
          });
          res.cookie('token', token, { httpOnly: true }).sendStatus(200);
        }
      });
    }
  });
});

router.post('/feed', async (req, res) => {
  console.log(req.body);
  const { userId, interView, quest, task, contentText, rating } = req.body;
  const newFeed = new Feedback({
    userId,
    interviewDate: interView,
    createDate: Date.now(),
    questions: quest,
    tasks: task,
    contentText,
    rating,
  });
  newFeed.save().then(data => {
    res.json(data._id);
  });
});

// проверяем есть ли токен в куках браузера

router.get('/checkToken', withAuth, (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
