const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const db = require('../models/config');

const saltRounds = 10;

router.post('/register', (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      res.send({ err })
    }

    db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)", 
      [username, email, hash],
      (err, result) => {
        if (err) {
          res.send({ message: 'Registration problem, please try again'});
        } else {
          res.send({ result });
        }
    });
  });
});

module.exports = router;