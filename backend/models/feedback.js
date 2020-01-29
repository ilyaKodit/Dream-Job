const mongoose = require('mongoose');

const { Schema, model, ObjectId } = mongoose;

const FeedbackSchema = new Schema({
  interviewDate: Date,
  createDate: Date,
  questions: String,
  tasks: String,
  contentText: String,
  rating: Number,
  companyId: String,
  userId: {
    type: ObjectId,
    ref: 'user',
  },
  userName: String
});

module.exports = model('Feedback', FeedbackSchema);
