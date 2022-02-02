const express = require('express');
const router = express.Router();
const User = require('./models/User');
const Item = require('./models/Item');

router.post('/item/add', (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem.save().then(item => res.redirect('/'));
});

router.post('/user/login', async (req, res) => {
  await User.find(user => user.password == req.body.password)
  res.res
});

router.post('/user/register', (req, res) => {
  const newUser = new User({
    login: req.body.login,
    password: req.body.password
  });

  newUser.save().then(user => res.redirect('/login'));
});

module.exports = router;