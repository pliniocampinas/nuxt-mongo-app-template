import {Router} from 'express';
import Item from '../models/Item';

export const appController = Router();

appController.get('/validate-auth', async (req, res, next) => {
  const items = await Item.find()
  res.render('index', { items })
});

appController.get('/register', (req, res) => {
  res.render('register', {})
});

appController.get('/login', (req, res) => {
  res.render('login', {})
});