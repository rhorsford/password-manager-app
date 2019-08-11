const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const AccInfoSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  type: {
    type: Option,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  confirmPassword: {
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
module.exports = AccountInfo = mongoose.model("accountInfo", AccInfoSchema);