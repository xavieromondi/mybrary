const express = require("express");
const Author = require("../model/authors");

const rout = express.Router();

rout.get("/", async (req, res) => {
  try {
    const author = await Author.find({});
    res.render("authors/index", { authors: author });
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
