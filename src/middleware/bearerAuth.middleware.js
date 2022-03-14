"use strict";

require("dotenv").config();
const JWT = require("jsonwebtoken");

function bearerAuth(users) {
  return async (req, res, next) => {
    if (req.headers["authorization"]) {
      const token = req.headers.authorization.split(" ")[1];
      users
        .validateToken(token)
        .then((user) => {
          req.user = user;
          next();
        })
        .catch((error) => res.status(401).send("Invalid Token"));
    } else {
      res.status(401).send("Invalid Token");
    }
  };
}

module.exports = bearerAuth;
