const express = require("express");
const Author = require("../model/authors");

const rout = express.Router();

rout.get("/", (req, res) => {
  res.render("authors/index");
});

rout.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() });
});

rout.post("/", (req, res) => {
  res.send(req.body.name);
});

module.exports = rout;
