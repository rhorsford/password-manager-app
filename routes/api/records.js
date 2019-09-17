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


postPasswords = (req, res) => {
  const {errors, isValid} = validateRecordInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  } else {
    const valid = isValid;
    const newRecord = new Record({
      id: req.body.id,
      name: req.body.name,
      title: req.body.title,
      type: req.body.type,
      password: req.body.password,
      confirm_password: req.body.confirm_password,
      url: req.body.url,
      comments: req.body.comments
    });

    newRecord
        .save()
        .then(record => res.json(record))
        .catch(err => console.log(err));

    // bcrypt.genSalt(10, (err, salt) => {
    //   bcrypt.hash(newRecord.password, salt, (err, hash) => {
    //     if (err) throw err;
    //     newRecord.password = hash;
    //     newRecord.confirm_password = hash;
    //
    //     newRecord
    //         .save()
    //         .then(record => res.json(record))
    //         .catch(err => console.log(err));
    //     // newRecord.save((err) => {
    //     //   if (err) return res.json({success: false, error: err});
    //     //   return res.json({success: true});
    //     // });
    //   });
    // });
  }
};

getPassMethod = (req, res) => {
  return Record.find({name: req.params.name, type: req.params.type}).then(function(record) {
    res.json({data: record })
  })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
};

editPassMethod = (req, res) => {
  return Record.find({name: req.params.name, title: req.params.title}).then(function(record) {
    res.json({data: record })
  })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
};

updatePassMethod = (req, res) => {
  const recordToUpdate = req.params.id;
  Record.update({id: recordToUpdate}, req.body, function (err, result){
    res.send(
        (err === null) ? {msg: ''} : {msg: err}
    );
  });
};

removePassMethod = (req, res) => {
  const recordToDelete = req.params.id;
  Record.deleteOne({id: recordToDelete},function (err, result){
    res.send(
        (err === null) ? {msg: ''} : {msg: err}
    );
  });
};

//Post requests
router.post('/email', (req, res) => {
  postPasswords(req, res)
});

router.post('/general', (req, res) => {
  postPasswords(req, res)
});

//Get requests

router.get('/email/:name/:type', (req, res) => {
  getPassMethod(req, res)
});

router.get('/general/:name/:type', (req, res) => {
  getPassMethod(req, res)
});

router.get('/:title/:name', (req, res) => {
  editPassMethod(req, res)
});

router.post('/general/:title', (req, res) => {
  getPassMethod(req, res)
});
router.put('/update/:id', (req, res) => {
  updatePassMethod(req, res)
});

router.delete('/delete/:id', (req, res) => {
  removePassMethod(req, res)
});



module.exports = router;
