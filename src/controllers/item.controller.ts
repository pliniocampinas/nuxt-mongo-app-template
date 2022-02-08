import {Router} from 'express';
import Item from '../models/Item';

export const itemController = Router();

itemController.post('/', async (req, res, next) => {
  await Item.create(...req.body)

  res.status(201).json({
    message: "created"
  });
});