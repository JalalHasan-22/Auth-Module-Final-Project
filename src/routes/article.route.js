"use strict";

const express = require("express");
const bearerAuth = require("../middleware/bearerAuth.middleware");
const acl = require("../middleware/acl.middleware");
const router = express.Router();
const { users } = require("../models/index.model");

// Routes
router.get("/article", bearerAuth(users), acl("read"), readArticleHandler);
router.post("/article", bearerAuth(users), acl("create"), createNewArticle);
router.put("/article", bearerAuth(users), acl("update"), updateArticle);
router.delete("/article", bearerAuth(users), acl("delete"), deleteArticle);

// Handlers

// Read One Article
function readArticleHandler(req, res) {
  res.status(200).send("You can read this article");
}

// Create New Article
function createNewArticle(req, res) {
  res.status(200).send("You can create an article");
}

// Update article
function updateArticle(req, res) {
  res.status(201).send("you can update this artice");
}

// Delete Article
function deleteArticle(req, res) {
  res.status(200).send("you can delete this articel");
}

module.exports = router;
