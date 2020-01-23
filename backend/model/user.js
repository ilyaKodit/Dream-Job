const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const Userschema = new Schema({
  login: String,
  password: String,
  email: String,
});


module.exports = model('user', Userschema);
