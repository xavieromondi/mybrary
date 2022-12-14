const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const indexRouter = require("./routs/index");
const authorsRouter = require("./routs/authors");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://xavier:basketballa@cluster0.vi4vzcw.mongodb.net/mybrary?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("DBconnected sucessfully"));

const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));
app.use("/", indexRouter);
app.use("/authors", authorsRouter);

app.listen(process.env.PORT || 3000);
