"use strict";

const base64 = require("base-64");

function basicAuth(users) {
  return async (req, res, next) => {
    if (req.headers["authorization"]) {
      const basicHeaders = req.headers.authorization.split(" ")[1];
      const decoded = base64.decode(basicHeaders).split(":");
      const [username, password] = decoded;
      try {
        const retreivedUser = await users.authenticateBasic(username, password);
        req.user = retreivedUser;
        next();
      } catch (error) {
        console.log(error);
        next(error.message);
      }
    }
  };
}
module.exports = basicAuth;
