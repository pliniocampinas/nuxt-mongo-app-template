import * as express from 'express';
import * as errorhandler from 'strong-error-handler';
import { userController } from './controllers/user.controller';
import { itemController } from './controllers/item.controller';
import authenticate from './middlewares/authenticate';
var cors = require('cors')

export const app = express();
app.use(cors({credentials: true, origin: true}))
// middleware for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true}))
// middleware for json body parsing
app.use(express.json())
// middleware for authentication
app.use(authenticate)
app.use(express.static('dist/public'));

// Route Controllers
app.use('/user', userController);
app.use('/item', itemController);

app.use(errorhandler({
  debug: process.env.ENV !== 'prod',
  log: true,
}));
