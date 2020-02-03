const mongoose = require('mongoose');

const { Schema, model} = mongoose;

const keySchema = new Schema({
    key: String
});

module.exports = model('Key', keySchema);
