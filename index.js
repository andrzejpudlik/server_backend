const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const groupsRoute = require('./routes/groups.js');
const tasksRoute = require('./routes/tasks.js');
const usersRoute = require('./routes/users.js');
const settingRoute = require('./routes/setting.js');
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const personalDataRoute = require('./routes/personal_data');

const SESS_NAME = 'sid';
const app = express();

app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    name: SESS_NAME,
    key: 'userId',
    secret: 'text',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 1000,
    },
  })
);

app.use('/', tasksRoute);
app.use('/', groupsRoute);
app.use('/', usersRoute);
app.use('/', settingRoute);
app.use('/', registerRoute);
app.use('/', loginRoute);
app.use('/', personalDataRoute);

app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      res.send({err});
    };
    res.clearCookie(SESS_NAME);
    res.redirect('/login');
  }) 
});

app.listen(3001, () => {
  console.log("running on port 3001");
})