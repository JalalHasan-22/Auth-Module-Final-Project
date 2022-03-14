"use strict";

const express = require("express");
const router = express.Router();
const { users } = require("../models/index.model");
const bcrypt = require("bcrypt");
const basic = require("../middleware/basicAuth.middleware");
const bearer = require("../middleware/bearerAuth.middleware");
const res = require("express/lib/response");

// Routes
router.get("/users", getUsersHandler);
router.post("/signup", signupHandler);
router.post("/signin", basic(users), signinHandler);
router.get("/articles", bearer(users), getArticlesHandler);

// Handlers

//Signup
async function signupHandler(req, res) {
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 5);
  try {
    const newUser = await users.create({
      username: username,
      password: hashedPassword,
      role: role,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
}

// Signin
function signinHandler(req, res) {
  res.status(200).json(req.user);
}

// Get ALL USERS
async function getUsersHandler(req, res) {
  const allUsers = await users.findAll();
  res.status(200).json(allUsers);
}

// Get All Atricles

function getArticlesHandler(req, res) {
  res
    .status(200)
    .send(`Welcome ${req.user.username}, you can read all the articles`);
}

module.exports = router;
