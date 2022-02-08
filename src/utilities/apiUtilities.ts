import { NextFunction, Request, Response } from 'express';
import * as HttpStatusCode from 'http-status-codes';
import IRequest from '../types/IRequest';
import ApiResponse from './apiResponse';

const extractUserIdFromRequest = (req: IRequest) => {
  return req.user.id;
};

const extractCookieFromRequest = (req: Request, key: string) => {
  if (req.headers.authorization) {
    return req.headers.authorization;
  }
  if (req.headers.cookie) {
    const results = req.headers.cookie.split(';');
    const filtered = results.filter((result) => {
      return result.startsWith(`${key}=`);
    });
    if (filtered.length > 0) {
      return filtered[0].split('=')[1];
    }
  }
  return null;
};

const sanitizeUser = (user: any) => {
  const { password, ...userWithOutPassword } = user;
  return userWithOutPassword;
};

const restrictToStaff = (req: IRequest, res: Response, next: NextFunction) => {
  if (req.user.accessLevel < 10) {
    ApiResponse.error(res, HttpStatusCode.FORBIDDEN);
    return;
  }
  next();
};

export {
  extractUserIdFromRequest,
  sanitizeUser,
  extractCookieFromRequest,
  restrictToStaff,
};
