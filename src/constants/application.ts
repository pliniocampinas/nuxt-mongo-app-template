const base = '';

export default {
  url: {
    base,
  },
  timers: {
    userCookieExpiry: '720h',
  },
  env: {
    authSecret: process.env.TOKEN_SECRET_KEY || 'test',
  },
  authorizationIgnorePath: [
    `${base}/user/login`,
    `${base}/user/register`,
    `${base}/app/login`,
    `${base}/app/register`,
  ],
};
