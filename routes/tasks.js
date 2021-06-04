const express = require('express');
const router = express.Router();

const db = require('../models/config');

router.get('/tasks', (req, res) => {
  db.query("SELECT * FROM `tasks`, `groups` WHERE tasks.id_group=groups.id_group", (err, result) => {
    if (err) {
      res.send({ message: 'Problem with downloading tasks, please try again' })
    } else {
      res.send(result);
    };
  });
});

router.post('/task/create', (req, res) => {
  const name_task = req.body.name_task;
  const important = req.body.important;
  const date_finish = req.body.date_finish;
  const id_group = req.body.id_group;

  db.query('INSERT INTO tasks (name_task, important, date_finish, id_group) VALUES (?, ?, ?, ?)',
  [name_task, important, date_finish, id_group],
  (err, result) => {
    if (err) {
      res.send({ message: 'Problem adding a task, please try again'});
    } else {
      res.send({ result });
      console.log('success');
    }
  });
});

router.delete('/delete/task/:id_task', (req, res) => {
  const id_task = req.params.id_task;
  console.log(id_task);

  db.query('DELETE FROM tasks WHERE id_task = ?', id_task, (err, result) => {
    if (err) {
      res.send({ message: 'Problem with task deletion, please try again' })
    } else {
      res.send(result);
    };
  });
});

module.exports = router;
