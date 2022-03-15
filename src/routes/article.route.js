"use strict";

const express = require("express");
const bearerAuth = require("../middleware/bearerAuth.middleware");
const acl = require("../middleware/acl.middleware");
const router = express.Router();
const { users, articles } = require("../models/index.model");

// Routes
router.post("/article", bearerAuth(users), acl("create"), createNewArticle);
router.get("/article", bearerAuth(users), acl("read"), readArticleHandler);
router.get("/article/:id", bearerAuth(users), acl("read"), readAspecificArticleHandler);
router.put("/article:id", bearerAuth(users), acl("update"), updateArticle);
router.delete("/article/:id", bearerAuth(users), acl("delete"), deleteArticle);

// Handlers

// Read One Article
async function readArticleHandler(req, res) {
let Article =await articles.findAll();
  res.status(200).json(Article);
}

// Create New Article
async function createNewArticle(req, res) {
  let newArticle= req.body;
  let article =await articles.create(newArticle);
  res.status(201).json(article);
}

// Update article
async function updateArticle(req, res) {
  const id = parseInt(req.params.id);
  let updatedOne = req.body;
  let updatedArticle=await articles.findOne({ where: { id: id } });
  let updateArticle = await updatedArticle.update(updatedOne);
  res.status(201).json(updateArticle);
}

// Delete Article
async function deleteArticle(req, res) {
  const id = parseInt(req.params.id);
    let deleteArticle = await articles.destroy({where: {id}});
    res.status(204).json(deleteArticle);
}

//readAspecificArticleHandler
async function readAspecificArticleHandler(req,res){
  const id = parseInt(req.params.id);
    const ArticleID = await articles.findOne({ where:{ id: id}});
    res.status(200).json(ArticleID);

}

module.exports = router;
