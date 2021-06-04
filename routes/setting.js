const express = require('express');
const router = express.Router();

const db = require('../models/config');

router.post('/setting/user', (req, res) => {
  const username = req.body.username;
  
  db.query(
    "SELECT users.email, personal_data.firstname, personal_data.lastname, personal_data.phone FROM users, personal_data WHERE users.username = ? AND users.id = personal_data.id_data", 
    username,
    (err, result) => {
      if (err) {
        res.send({ err })
      } 
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: 'Not found a user data'});
      } 
      
  });
});

router.put('/setting/user/update', (req, res) => {

  const id = req.body.id;
  const id_data = id;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const phone = req.body.phone;

  db.query(
    "UPDATE `users`, `personal_data` SET users.email = ?, personal_data.firstname = ?, personal_data.lastname = ?, personal_data.phone = ? WHERE users.id = ? AND personal_data.id_data = ?",
    [email, firstname, lastname, phone, id, id_data],
    (err, result) => {
      if (err) {
        res.send({ message: 'Problem with data modification, please try again' })
      } else {
        res.send(result);
      }  
    });
})

module.exports = router;