const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const router = express.Router();

// const User = require('../models/userSchema');

mongoose.connect('mongodb://localhost/DreamJob', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


router.get('/', async (req, res) => {


    res.json({test: 'hello bro!'});
});


module.exports = router;
