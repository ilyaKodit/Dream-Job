const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

// const bcrypt = require('bcrypt');
// const { sessionChecker } = require('../middleware/auth');
// const saltRounds = 10;
const router = express.Router();

const User = require('../model/user');
const Feedback = require('../model/feedback');
const Company = require('../model/company');


router.get('/', async (req, res) => {
  res.json({ test: 'hello bro!' });
});

router.get('/companies', async (req, res) => {

    let allCompanies = await Company.find();

    res.json(allCompanies);
});

router.post('/log', async (req, res) => {

  const { login, password } = req.body;
  const newUser = await User.findOne({ login });

  if (newUser && newUser.password === password) {

    // req.session.user = newUser;
    res.json({ id: newUser._id, login: newUser.login });
  }
  // } else res.json({ status: false })

});

router.post('/reg', async (req, res) => {
  console.log(req.body);
  let existenceUser = await User.findOne({ email: req.body.email });
  if (!existenceUser) {
    let newUser = new User({
      login: req.body.login,
      password: req.body.pass,
      email: req.body.email
    });
    newUser.save().then((data) => {
      res.json(data._id);
    });
  }
});

router.get('/feed', async (req, res) => {

  let allFeedback = await Feedback.find();
  res.json(allFeedback);
});

router.post('/feed', async (req, res) => {

  const { userId, companyId, interView, quest, task, contentText, rating } = req.body;
  let newFeed = new Feedback({
    userId,
    companyId,
    interviewDate: interView,
    createDate: Date.now(),
    questions: quest,
    tasks: task,
    contentText: contentText,
    rating: rating,
  });
  newFeed.save().then((data) => {

    res.json(data._id);
  });
});

module.exports = router;
