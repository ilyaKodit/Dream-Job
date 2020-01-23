const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
// const bcrypt = require('bcrypt');
// const { sessionChecker } = require('../middleware/auth');

// const saltRounds = 10;
const router = express.Router();
const User = require('../model/user');


router.get('/', async (req, res) => {
  res.json({ test: 'hello bro!' });
});

router.post('/log', async (req, res) => {
  console.log(req.body);
  const { login, password } = req.body;
  const newUser = await User.findOne({ login });
  console.log(newUser);
  if (newUser && newUser.password === password) {
    // req.session.user = newUser;
    res.json({ status: true });
  } else res.json({ status: false })
    ;
});



module.exports = router;
