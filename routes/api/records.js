// import { encrypt, decrypt } from "ncrypt-js";
const ncrypt = require('ncrypt-js');
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
// const secretKey = require("../../config/keys").encryptKey;


// console.log(secretKey);


// Load input validation
const validateRecordInput = require("../../validation/userPassword");
// Load User model
const Record = require("../../models/Record");

const encryptedFunction = require("../../config/encryptionService");
const decryptedFunction = require("../../config/decryptionService");

// @route POST api/newrecord/email
// @desc Register user
// @access Public


const postPasswords = (req, res) => {
  const {errors, isValid} = validateRecordInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  } else {
    const valid = isValid;
    const encryptPassword = encryptedFunction(req.body.password);
    const encryptConfirmPassword = encryptedFunction(req.body.confirm_password);

    const newRecord = new Record({
      id: req.body.id,
      name: req.body.name,
      title: req.body.title,
      type: req.body.type,
      password: encryptPassword,
      confirm_password: encryptConfirmPassword,
      url: req.body.url,
      comments: req.body.comments
    });

        newRecord
        .save()
        .then(record => res.json(record))
        .catch(err => console.log(err));
  }
};

const getPassMethod = (req, res) => {
  return Record.find({name: req.params.name, type: req.params.type}).then(function (record) {
    res.json({data: record});
  })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
};

const getCollectionCount = (req, res) => {
  return Record.collection.countDocuments({name: req.params.name, type: req.params.type}).then(function (record) {
    res.json({data: record})
  })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
};

const getTotalCollectionCount = (req, res) => {
  return Record.collection.countDocuments({name: req.params.name}).then(function (record) {
    res.json({data: record})
  })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
};

const editPassMethod = (req, res) => {
  return Record.find({name: req.params.name, id: req.params.id}).then(function (record) {
    res.json({data: record})
  })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
};

const updatePassMethod = (req, res) => {
  const recordToUpdate = req.params.id;
  const updateEncryptPassword = encryptedFunction(req.body.password);
  const updateEncryptConfirmPassword = encryptedFunction(req.body.confirm_password);

  const updatedRecord = {
    $set: {
      id: req.body.id,
      name: req.body.name,
      title: req.body.title,
      type: req.body.type,
      password: updateEncryptPassword,
      confirm_password: updateEncryptConfirmPassword,
      url: req.body.url,
      comments: req.body.comments
    }
  };

  Record.collection.updateOne({id: recordToUpdate}, updatedRecord, function (err, result) {
    res.send(
        (err === null) ? {msg: ''} : {msg: err}
    );
  });
};

const removePassMethod = (req, res) => {
  const recordToDelete = req.params.id;
  Record.deleteOne({id: recordToDelete}, function (err, result) {
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

router.post('/internet', (req, res) => {
  postPasswords(req, res)
});

router.post('/home-banking', (req, res) => {
  postPasswords(req, res)
});

router.post('/other', (req, res) => {
  postPasswords(req, res)
});
//Get requests

router.get('/password/:name/:type', (req, res) => {
  getCollectionCount(req, res)
});

router.get('/total/:name', (req, res) => {
  getTotalCollectionCount(req, res)
});

router.get('/email/:name/:type', (req, res) => {
  getPassMethod(req, res)
});

router.get('/general/:name/:type', (req, res) => {
  getPassMethod(req, res)
});

router.get('/internet/:name/:type', (req, res) => {
  getPassMethod(req, res)
});

router.get('/home-banking/:name/:type', (req, res) => {
  getPassMethod(req, res)
});

router.get('/other/:name/:type', (req, res) => {
  getPassMethod(req, res)
});

router.get('/:name/:id', (req, res) => {
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
