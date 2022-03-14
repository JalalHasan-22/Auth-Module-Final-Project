"use strict";

const express = require("express");
const app = new express();
const notFound = require("./errorHandlers/404");
const errorHandler = require("./errorHandlers/500");
const logger = require("./middleware/logger.middleware");
const userRoutes = require("./routes/user.route");
const articleRoutes = require("./routes/article.route");

app.use(express.json());
app.use(userRoutes);
app.use(logger);
app.use(articleRoutes);

app.get("/", (req, res) => {
  res.status(200).send("home route");
});

const start = (port) => {
  app.listen(port, () => {
    console.log(`Server running and listening on port ${port}`);
  });
};

app.use(errorHandler);
app.use("*", notFound);

module.exports = {
  app: app,
  start: start,
};
