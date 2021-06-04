const express = require('express');
const router = express.Router();

const db = require('../models/config');

router.post('/personal_data', (req, res) => {
  const id_data = req.body.id_data;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const phone = req.body.phone;

  db.query(
    "INSERT INTO personal_data (id_data, firstname, lastname, phone) VALUES (?, ?, ?, ?)",
    [id_data, firstname, lastname, phone], 
    (err, result) => {
      if (err) {
        res.send({ message: 'We have a problem, please try again' })
      } else {
        res.send({ result });
        console.log({ result });
      }
  });
});

router.post('/personal_data/is_exist', (req, res) => {
  const id = req.body.id;

  db.query(
    "SELECT users.id, personal_data.id_data FROM users, personal_data WHERE users.id = ? AND personal_data.id_data = ?",
    [id, id], 
    (err, result) => {
      if (err) {
        res.send({ message: 'Please try again' })
      }

      if (result.length > 0) {
        res.send({ result });
      } else {
        res.send({ message: 'Not found' })
      }
  });
});

module.exports = router;