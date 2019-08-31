const mongoose = require("mongoose");
const dateFormat = require('dateformat');
const Schema = mongoose.Schema;
// Create Schema


const RecordSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  confirm_password: {
    type: String,
    required: true
  },
  url: {
    type: String
  },
  comments: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Record = mongoose.model("records", RecordSchema);