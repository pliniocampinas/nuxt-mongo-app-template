import * as express from 'express';
import * as httpStatusCodes from 'http-status-codes';
import User from '../models/User';
import apiResponse from '../utilities/apiResponse';
import { verifyCookie } from '../utilities/encryptionUtils';
import { extractCookieFromRequest } from '../utilities/apiUtilities';
import application from '../constants/application';
import Constants from '../constants';
import IRequest from '../types/IRequest';

/**
 * Route authentication middleware to verify a token
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 *
 */

export default async (req: IRequest, res: express.Response, next: express.NextFunction) => {
  console.log('req.originalUr', req.originalUrl)
  if (application.authorizationIgnorePath.indexOf(`${req.originalUrl}`) === -1) {
    const authorizationHeader = extractCookieFromRequest(req, Constants.Cookie.COOKIE_USER);
    if (authorizationHeader) {
      const decoded = await verifyCookie(authorizationHeader);
      if (decoded) {
        const user  = await User.findById(decoded.data[Constants.Cookie.KEY_USER_ID]);
        if (user) {
          // @ts-ignore
          req.user = user;
        } else {
          apiResponse.error(res, httpStatusCodes.UNAUTHORIZED);
          return;
        }
      } else {
        apiResponse.error(res, httpStatusCodes.UNAUTHORIZED);
        return;
      }
    } else {
      apiResponse.error(res, httpStatusCodes.FORBIDDEN);
      return;
    }
  }

  next();
};