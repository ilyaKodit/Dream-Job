const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const Companyschema = new Schema({
  Id: String,
  averageRating: Number,
  count: Number,
});


module.exports = model('company', Companyschema);
