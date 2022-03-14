"use strict";

require("dotenv").config();
const { start } = require("./src/server");
const { db } = require("./src/models/index.model");

async function startServer() {
  await db.sync();
  start(process.env.PORT);
}

startServer();
