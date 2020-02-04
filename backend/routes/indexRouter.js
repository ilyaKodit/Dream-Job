/* eslint-disable no-underscore-dangle */
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const faker = require('faker');

const bcrypt = require('bcrypt');
// const { sessionChecker } = require('../middleware/auth');
// const saltRounds = 10;
const router = express.Router();


const User = require('../models/user');
const Feedback = require('../models/feedback');
const Company = require('../models/company');
const Key = require('../models/key');


const averageRating = async (companyId) => {
  const allFeedbackCompany = await Feedback.find({ companyId });
  // console.log(allFeedbackCompany);
  let allRating = 0;
  let totalReviews = 0;
  allFeedbackCompany.map((feed) => {
    allRating += feed.rating;
    totalReviews += 1;
  });

  const result = await Company.findOneAndUpdate({ id: companyId }, {
    averageRating: +(allRating / totalReviews).toFixed(1),
    count: totalReviews,
  });
  result.save();
  // return +(allRating / totalReviews).toFixed(1);
};


router.get('/', async (req, res) => {
  res.json({ test: 'hello bro!' });
});

router.get('/companies', async (req, res) => {
  console.log('1');
  const allCompanies = await Company.find();

  res.json(allCompanies);
});

router.post('/log', async (req, res) => {
  const { login, password } = req.body;
  const newUser = await User.findOne({ login });
  // console.log(newUser);
  if (newUser && (await bcrypt.compare(password, newUser.password))) {
    // if (newUser && newUser.password === password) {
    // req.session.user = newUser;
    res.json({ id: newUser._id, login: newUser.login });
  } else { res.json({ status: false }); }
});

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

    newUser.save().then((data) => {
      res.json(data);
    });
  }
});

router.get('/feed', async (req, res) => {
  const allFeedback = await Feedback.find();
  res.json(allFeedback);
});

router.post('/feed', async (req, res) => {
  const {
    userId, companyId, interView, quest, task, contentText, rating,
  } = req.body;

  const user = await User.find({ _id: userId });

  const newFeed = new Feedback({
    userId,
    companyId,
    interviewDate: interView,
    createDate: Date.now(),
    questions: quest,
    tasks: task,
    contentText,
    rating,
    userName: user[0].login,
  });

  newFeed.save().then(async (data) => {
    await averageRating(companyId);
    res.json(data);
  });
});

router.post('/add/employer', async (req, res) => {
  console.log(req.body);
  const existenceCompany = await Company.findOne({ id: req.body.id });
  if (!existenceCompany) {
    const newEmployer = new Company(req.body);
    newEmployer.save()
      .then(res.json({ status: 'Успешно добавлено' }))
      .catch(res.json({ status: 'Ошибка при сохранении в базу данных' }));
  }
  await res.json({ status: 'Уже добавлено' });
});


router.post('/key', async (req, res) => {
  const result = await Key.findOne({ key: req.body.key });

  res.json({ status: result });
});

router.post('/createKey', async (req, res) => {
  const allCreateKeys = [];

  for (let i = 0; i < req.body.num; i++) {
    const key = await faker.random.number(100000000000);
    const newKey = new Key({
      key,
    });
    newKey.save();

    allCreateKeys.push(key);
  }

  res.json({ keys: allCreateKeys });
});

router.post('/search/companies', async (req, res) => {
  const allCompanies = await Company.find();
  const searchStr = req.body.searchString.toLowerCase().trim();
  const filteredCompanies = allCompanies.filter((item) => item.name.toLowerCase().search(searchStr) !== -1);
  res.json(filteredCompanies);
});

module.exports = router;
