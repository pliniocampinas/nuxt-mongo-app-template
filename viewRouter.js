const express = require('express');
const router = express.Router();
const Item = require('./models/Item');

// App views
router.get('/', (req, res) => {
  Item.find()
    .then(items => res.render('index', { items }))
    .catch(err => res.status(404).json({ msg: 'No items found' }));
});

router.get('/login', (req, res) => {
  res.render('login', {})
});

router.get('/register', (req, res) => {
  res.render('register', {})
});

module.exports = router;