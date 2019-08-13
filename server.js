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

const OwlSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Must have a name"], minlength: 1 },
    age: { type: Number, min: 1 }
  },
  { timestamps: true }
);
const Owl = mongoose.model("Owl", OwlSchema);

app.get("/", (req, res) => {
  Owl.find()
    .then(owls => {res.render("index", {owls: owls})})
    .catch(err => res.json(err));
  
});

app.post("/create", (req, res) => {
  //EASEIER WAY TO CREATE IN DASHBOARD ---> userData = req.body
  // (Also below in post "/:id" route)
  const owl = new Owl();
  owl.name = req.body.name;
  owl.age = req.body.age;
  owl
    .save()
    .then(newOwlData => {
      console.log("owl made: ", newOwlData);
      res.redirect("/");
    })
    .catch(err => {
      console.log("We have an error!", err.errors);
      for (var key in err.errors) {
        console.log("key --> ", key);
        console.log("err.errors[key] --> ", err.errors[key]);
        console.log("err.errors[key].message --> ", err.errors[key].message);
        req.flash("registration", err.errors[key].message);
      }
      res.redirect("/new");
    });
});

app.get("/new", (req, res) => {
  res.render("new");
});

app.get("/destroy/:id", (req, res) => {
  id = req.params.id;
  console.log(id);
  Owl.deleteOne({_id: id})
    .then(deleted =>{})
    .catch(err => res.json(err));
  res.redirect("/");
});

app.get("/edit/:id", (req, res) =>{
  Owl.findOne({_id: req.params.id})
    .then(data => {
      console.log(data);
      const owl = data;
      res.render("edit", {owl: owl});
    })
    .catch(err => res.json(err));
});

app.post("/:id", (req, res) =>{
  const userData = req.body;
  console.log(userData);
  console.log(req.params.id);
  Owl.updateOne({_id: req.params.id}, {
    name: userData.edit_name,
    age: userData.edit_age,
  }
    )
    .then(updated =>{
      res.redirect("/")
    })
    .catch(err => res.json(err));
    
});

app.listen(8000, () => console.log("PORT 8000 - DAHSBOARD"));