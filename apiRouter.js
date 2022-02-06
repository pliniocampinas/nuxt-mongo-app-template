const express = require('express');
const router = express.Router();
const User = require('./models/User');
const Item = require('./models/Item');
const CreateItem = require('./controllers/CreateItem');

router.post('/item', CreateItem.handle);

router.post('/user/login', async (req, res) => {
  await User.find(user => user.password == req.body.password)
});

router.post('/user/register', (req, res) => {
  const newUser = new User({
    login: req.body.login,
    password: req.body.password
  });

  newUser.save().then(user => res.redirect('/login'));
});

module.exports = router;