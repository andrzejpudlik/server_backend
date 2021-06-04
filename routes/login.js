const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const db = require('../models/config');

router.get('/login', (req, res) => {
  if (req.session.user) {
    res.send({
      loggedIn: true,
      user: req.session.user
    })
  } else {
    res.send({
      loggedIn: false
    })
  }
})

router.post('/login', (req, res) => {

  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE username = ?", 
    username,
    (err, result) => {
      if (err) {
        res.send({ err })
      } 

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (err, response) => {
          if (response) {
            req.session.user = result;
            res.send(result);
          } else {
            res.send({ message: 'Wrong username or password combination!'});
          }
        })
      } else {
        res.send({ message: 'Wrong username or password combination!'});
      }
  });
});

module.exports = router;