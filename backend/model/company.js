const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const Companyschema = new Schema({
  interviewDate: Date,
  createDate: Date,
  questions: String,
  tasks: String,
  contentText: String,
  rating: Number,
  userId: String,
  name: String,
});


module.exports = model('company', Companyschema);
