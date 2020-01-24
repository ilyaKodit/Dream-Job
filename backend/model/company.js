const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const Companyschema = new Schema({
  id: String,
  name: String,
  image: String,
  site_url: String,
  city: String,
  averageRating: Number,
  count: Number,
});


module.exports = model('company', Companyschema);
