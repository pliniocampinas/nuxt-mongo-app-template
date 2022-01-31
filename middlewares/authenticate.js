const authorizationIgnorePath = [
  `/login`,
  `/register`,
];

module.exports = authenticate = async (req, res, next) => {
  // if (application.authorizationIgnorePath.indexOf(`${req.originalUrl}`) === -1) {
  //   const authorizationHeader = extractCookieFromRequest(req, Constants.Cookie.COOKIE_USER);
  //   if (authorizationHeader) {
  //     const decoded = await verifyCookie(authorizationHeader);
  //     if (decoded) {
  //       const user  = await User.findByPk(decoded.data[Constants.Cookie.KEY_USER_ID]);
  //       if (user) {
  //         req.user = user;
  //       } else {
  //         res.error(res, httpStatusCodes.UNAUTHORIZED);
  //         return;
  //       }
  //     } else {
  //       res.error(res, httpStatusCodes.UNAUTHORIZED);
  //       return;
  //     }
  //   } else {
  //     res.error(res, httpStatusCodes.FORBIDDEN);
  //     return;
  //   }
  // }

  next();
};