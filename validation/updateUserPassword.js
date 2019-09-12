const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateUpdatedRecordInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.editName = !isEmpty(data.editName) ? data.editName : "";
  data.editTitle = !isEmpty(data.editTitle) ? data.editTitle : "";
  data.editPassword = !isEmpty(data.editPassword) ? data.editPassword : "";
  data.editConfirm_password = !isEmpty(data.editConfirm_password) ? data.editConfirm_password : "";
// Name checks
  if (Validator.isEmpty(data.editName)) {
    errors.editName = "Name field is required";
  }
// Title checks
  if (Validator.isEmpty(data.editTitle)) {
    errors.editTitle = "Title field is required";
  }

// Password checks
  if (Validator.isEmpty(data.editPassword)) {
    errors.editPassword = "Password field is required";
  }
  if (Validator.isEmpty(data.editConfirm_password)) {
    errors.editConfirm_password = "Confirm password field is required";
  }
  if (!Validator.isLength(data.editPassword, { min: 2, max: 30 })) {
    errors.editPassword = "Password must be at least 6 characters";
  }
  if (!Validator.equals(data.editPassword, data.editConfirm_password)) {
    errors.editConfirm_password = "Passwords must match";
  }
  return {
    errors,
    isValid: isEmpty(errors),

  };
};