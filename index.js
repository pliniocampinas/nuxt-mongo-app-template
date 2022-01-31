const express = require('express');
const mongoose = require('mongoose');
const authenticate = require('./middlewares/authenticate');

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
// middleware for json body parsing
app.use(express.json())
// middleware for authenticatio
app.use(authenticate);

// Connect to MongoDB
mongoose
  .connect(
    'mongodb://mongo:27017/docker-node-mongo',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const Item = require('./models/Item');
const User = require('./models/User');

app.get('/', (req, res) => {
  console.log('home')
  Item.find()
    .then(items => res.render('index', { items }))
    .catch(err => res.status(404).json({ msg: 'No items found' }));
});

app.post('/item/add', (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem.save().then(item => res.redirect('/'));
});

app.get('/login', (req, res) => {
  console.log('login')
  res.render('login', {})
});

app.get('/register', (req, res) => {
  console.log('register')
  res.render('register', {})
});

app.post('/user/login', (req, res) => {
  User.find(user => user.password == req.body.password)
    .then(user => res.redirect('/'))
    .catch(err => res.redirect('/register'));
});

app.post('/user/register', (req, res) => {
  const newUser = new User({
    login: req.body.login,
    password: req.body.password
  });

  newUser.save().then(user => res.redirect('/login'));
});

const port = 3000;

app.listen(port, () => console.log('Server running...'));
