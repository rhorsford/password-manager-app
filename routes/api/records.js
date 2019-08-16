const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Load input validation
const validateRecordInput = require("../../validation/userPassword");
// Load User model
const Record = require("../../models/Record");

// @route POST api/newrecord/email
// @desc Register user
// @access Public


router.post('/email', (req, res) => {
  // const { id, update } = req.body;
  // const { errors, isValid } = req.body;
  const { errors, isValid } = validateRecordInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  } else {
    const newRecord = new Record ({
        name: req.body.name,
        title: req.body.title,
        type: req.body.type,
        password: req.body.password,
        confirm_password: req.body.confirm_password,
        url: req.body.url,
        comments: req.body.comments
      });

    bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(newRecord.password, newRecord.confirm_password, salt, (err, hash) => {
    if (err) throw err;
    newRecord.password = hash;
    newRecord.confirm_password = hash;
    // newRecord
    //     .save()
    //     .then(record => res.json(record))
    //     .catch(err => console.log(err));
    newRecord.save((err) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  });
});

    // newRecord
    //     .save()
    //     .then(records => res.json(records))
    //     .catch(err => console.log(err));

    //works
    // newRecord.save((err) => {
    //   if (err) return res.json({ success: false, error: err });
    //   return res.json({ success: true });
    // });

    // Record.validateRecordInput(errors, isValid, (err) => {
    //   if (err) return res.json({success: false, error: err});
    //   return res.json({success: true});
    // });
  }
});
// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(newRecord.password, salt, (err, hash) => {
//     if (err) throw err;
//     newRecord.password = hash;
//     newRecord
//         .save()
//         .then(record => res.json(record))
//         .catch(err => console.log(err));
//   });
// });
// router.post("/email", (req, res) => {
//   // Form validation
//   const { errors, isValid } = validateRecordInput(req.body);
// // Check validation
//   if (!isValid) {
//     return res.status(400).json(errors);
//   }
//   Record.findOne({ name: req.body.name }).then(record => {
//     if (record) {
//       return res.status(400).json({ name: "Record already exists" });
//     } else {
//       const newRecord = new Record ({
//         name: req.body.name,
//         title: req.body.title,
//         type: req.body.type,
//         password: req.body.password,
//         confirm_password: req.body.confirm_password,
//         url: req.body.url,
//         comments: req.body.comments
//       });

// Hash password before saving in database


//   });
// });

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
// router.post("/login", (req, res) => {
//   // Form validation
//   const { errors, isValid } = validateLoginInput(req.body);
// // Check validation
//   if (!isValid) {
//     return res.status(400).json(errors);
//   }
//   const email = req.body.email;
//   const password = req.body.password;
// // Find user by email
//   User.findOne({ email }).then(user => {
//     // Check if user exists
//     if (!user) {
//       return res.status(404).json({ emailnotfound: "Email not found" });
//     }
// // Check password
//     bcrypt.compare(password, user.password).then(isMatch => {
//       if (isMatch) {
//         // User matched
//         // Create JWT Payload
//         const payload = {
//           id: user.id,
//           name: user.name
//         };
// // Sign token
//         jwt.sign(
//             payload,
//             keys.secretOrKey,
//             {
//               expiresIn: 31556926 // 1 year in seconds
//             },
//             (err, token) => {
//               res.json({
//                 success: true,
//                 token: "Bearer " + token
//               });
//             }
//         );
//       } else {
//         return res
//             .status(400)
//             .json({ passwordincorrect: "Password incorrect" });
//       }
//     });
//   });
// });


module.exports = router;
