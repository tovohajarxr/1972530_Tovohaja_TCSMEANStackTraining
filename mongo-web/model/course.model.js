const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const CourseSchema = mongoose.Schema({
  _id: Number,
  name: String,
  description: String,
  amount: Number
});

let Course = mongoose.model('', CourseSchema, 'Course');

module.exports = Course