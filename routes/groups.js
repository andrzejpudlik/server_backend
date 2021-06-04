const express = require('express');
const router = express.Router();

const db = require('../models/config');

router.delete('/delete/group/:id_group', (req, res) => {
  const id_group = req.params.id_group;
  console.log(id_group);
  db.query('DELETE FROM `groups` WHERE id_group = ?', id_group, (err, result) => {
    if (err) {
      res.send({ message: 'Problem with group deletion, please try again' })
    } else {
      res.send(result);
    };
  });
});

router.get('/groups', (req, res) => {
  db.query('SELECT * FROM `groups`', (err, result) => {
    if (err) {
      res.send({ message: 'Problem with downloading groups, please try again' })
    } else {
      res.send(result);
    };
  });
});

router.post('/group/create', (req, res) => {
  const name_group = req.body.name_group;

  db.query('INSERT INTO `groups` (name_group) VALUES (?)',
  [name_group],
  (err, result) => {
    if (err) {
      res.send({ message: 'Problem adding a group, please try again'});
      console.log(err);
    } else {
      res.send({ result });
      console.log('success');
    }
  });
});

router.get('/group/users', (req, res) => {
  db.query(
    "SELECT users.id, users.email, users.id_group, personal_data.firstname, personal_data.lastname, personal_data.phone FROM `users`, `personal_data`, `groups` WHERE users.id=personal_data.id_data AND users.id_group=groups.id_group", 
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
})

router.put('/remove/group/user', (req, res) => {
  const id = req.body.id;

  db.query('UPDATE users SET id_group = NULL WHERE id = ?', 
    id, (err, result) => {
    if (err) {
      res.send({ message: 'Problem with user deletion, please try again' })
    } else {
      res.send(result);
    };
  });
});

router.put('/update/group/user', (req, res) => {
  const id_group = req.body.id_group;
  const id = req.body.id;
  db.query(
    'UPDATE users SET id_group = ? WHERE id = ?',
    [id_group, id],
    (err, result) => {
      if (err) {
        res.send({ message: 'Problem with adding user to group, please try again' })
      } else {
        res.send(result);
      }  
    });
})

module.exports = router;