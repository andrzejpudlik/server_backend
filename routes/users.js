const express = require('express');
const router = express.Router();

const db = require('../models/config');

router.get('/users', (req, res) => {
  db.query(
    `SELECT users.id, users.email, users.id_group, personal_data.firstname, personal_data.lastname, personal_data.phone
       FROM users, personal_data 
       WHERE users.id=personal_data.id_data`, 
    (err, result) => {
      if (err) {
        res.send({ err })
      } 

      if (result.length > 0) {
        res.send({ result });
      } else {
        res.send({ message: 'Not found users'});
      }      
  });
});

module.exports = router;