"use strict";

function acl(action) {
  return (req, res, next) => {
    try {
      if (req.user.actions.includes(action)) {
        next();
      } else {
        console.log("inside else acl");
        res.status(403).send("Access Denied");
      }
    } catch (error) {
      console.log(error);
      next(error.message);
    }
  };
}

module.exports = acl;
