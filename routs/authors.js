const express = require("express");
const Author = require("../model/authors");

const rout = express.Router();

rout.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name != "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  try {
    const author = await Author.find(searchOptions);
    res.render("authors/index", { authors: author, searchOptions: req.query });
  } catch {
    res.redirect("/");
  }
});

rout.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() });
});

rout.post("/", (req, res) => {
  const author = new Author({
    name: req.body.name,
  });
  author.save((err, newAuthor) => {
    if (err) {
      res.render("authors/new", {
        author: author,
        errorMessage: "Error creating Author",
      });
    } else {
      res.redirect(`authors`);
    }
  });
});

module.exports = rout;
