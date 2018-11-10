const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
// Mongoose Schema
const User = require('../models/user');

router.post('/join', (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(result => {
          res.status(201).json({
            message: 'User Created',
            result: result
          });
        })
        // If user already exists
        .catch(err => {
          res.status(500).json({
            error: err
          })
        });
    });
});

module.exports = router;