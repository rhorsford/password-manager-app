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

  const {errors, isValid} = validateRecordInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  } else {
    const valid = isValid;
    const newRecord = new Record({
      name: req.body.name,
      title: req.body.title,
      type: req.body.type,
      password: req.body.password,
      confirm_password: req.body.confirm_password,
      url: req.body.url,
      comments: req.body.comments
    });


    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newRecord.password, salt, (err, hash) => {
        if (err) throw err;
        newRecord.password = hash;
        newRecord.confirm_password = hash;

        newRecord
            .save()
            .then(record => res.json(record))
            .catch(err => console.log(err));
        // newRecord.save((err) => {
        //   if (err) return res.json({success: false, error: err});
        //   return res.json({success: true});
        // });
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

// router.get('/email/:name', (req, res) => {
//   Record.find((err, records) => {
//     if (err) return res.json({ success: false, error: err });
//     return res.json({ success: true, data: records });
//   });
//
//
// });




router.get('/email/:name', (req, res) => {
  return Record.find({name: req.params.name}).then(function(record) {
    res.json({data: record })
  })
      .catch(function (error) {
        // handle error
        console.log(error);
      })

  // Record.find({name: "test"})
  //     .then(record => res.send(record))
  //     .catch(err => console.log(err));
});

//


module.exports = router;
