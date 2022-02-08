import * as httpStatusCodes from 'http-status-codes';
import {Router} from 'express';
import User from '../models/User';
import { generateHash, verifyHash } from '../utilities/encryptionUtils'
import { sanitizeUser } from '../utilities/apiUtilities'
import apiResponse from '../utilities/apiResponse';
import { generateCookie } from '../utilities/encryptionUtils';
import constants from '../constants';
import locale from '../constants/locale';

export const userController = Router();

const generateUserCookie =  async (userId: number) => {
  return {
    key: constants.Cookie.COOKIE_USER,
    value:  await generateCookie(constants.Cookie.KEY_USER_ID, userId.toString()),
  };
};

interface LoginRequestBody {
  email: string
  password: string
}

userController.post('/login', async (req, res, next) => {

  const { email, password } = req.body as LoginRequestBody

  if (!email || !password) {
    throw Error('Empty crendentials')
  }

  const user = await User.findOne({ where: { email: email } })

  if (!user) {
    apiResponse.error(res, httpStatusCodes.BAD_REQUEST, locale.NOT_FOUND);
    return
  }

  if (! await verifyHash(password, user.password)) {
    apiResponse.error(res, httpStatusCodes.BAD_REQUEST, locale.INVALID_CREDENTIALS)
    return;
  }

  const cookie = await generateUserCookie(user.id);
  apiResponse.result(res, sanitizeUser((user as any).dataValues), httpStatusCodes.OK, cookie);
  
});

userController.post('/register', async (req, res, next) => {
  const user = await User.create({
    ...req.body,
    password: await generateHash(req.body.password, 10)
  });
  res.status(201).json(user);
});

userController.get('/validate-auth', async (req, res, next) => {
  res.json('Authorized');
});