const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash")

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(
  session({
    secret: "keyboardkitteh",
    resave: false,
    saveUninitialized: true
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/static"));
app.use(flash());

mongoose.connect("mongodb://localhost/mongoose_dash", {
  useNewUrlParser: true,
});

require("./server/routes/route")(app)
app.listen(8000, () => console.log("PORT 8000 - DASHBOARD"));