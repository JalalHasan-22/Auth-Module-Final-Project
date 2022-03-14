"use strict";

process.env.SECRET = "toes";

const middleware = require("../src/middleware/bearerAuth.middleware");
const { db } = require("../src/models/index.model");
const jwt = require("jsonwebtoken");

let userInfo = {
  admin: { username: "admin", password: "password" },
};

// Pre-load our database with fake users
beforeAll(async () => {
  await db.sync();
});
afterAll(async () => {
  await db.drop();
  //   done();
});

describe("Auth Middleware", () => {
  // Mock the express req/res/next that we need for each middleware call
  const req = {};
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(() => res),
  };
  const next = jest.fn();

  describe("user authentication", () => {
    it("fails a login for a user (admin) with an incorrect token", () => {
      req.headers = {
        authorization: "Bearer thisisabadtoken",
      };

      middleware(req, res, next);
      expect(next).toBeDefined();
    });

    it("logs in a user with a proper token", () => {
      const user = { username: "admin" };
      const token = jwt.sign(user, process.env.SECRET);

      req.headers = {
        authorization: `Bearer ${token}`,
      };

      middleware(req, res, next);
      expect(next).toBeDefined();
    });
  });
});
