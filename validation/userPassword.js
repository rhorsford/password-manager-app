const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateUserDetailsInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.title = !isEmpty(data.title) ? data.title : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirm_password = !isEmpty(data.confirm_password) ? data.confirm_password : "";
// Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
// Title checks
  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

// Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  if (Validator.isEmpty(data.confirm_password)) {
    errors.confirm_password = "Confirm password field is required";
  }
  if (!Validator.isLength(data.password, { min: 2, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  if (!Validator.equals(data.password, data.confirm_password)) {
    errors.confirm_password = "Passwords must match";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};