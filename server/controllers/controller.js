const Owl = require("../models/model");

exports.index = function(req, res) {
  Owl.find()
    .then(owls => {
      res.render("index", { owls: owls });
    })
    .catch(err => res.json(err));
};

exports.create = function(req, res) {
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
};

exports.new = function(req, res) {
  res.render("new");
};
exports.destroy = function(req, res) {
  id = req.params.id;
  console.log(id);
  Owl.deleteOne({_id: id})
    .then(deleted =>{})
    .catch(err => res.json(err));
  res.redirect("/");
};

exports.edit = function(req, res) {
  Owl.findOne({_id: req.params.id})
  .then(data => {
    console.log(data);
    const owl = data;
    res.render("edit", {owl: owl});
  })
  .catch(err => res.json(err));
};

exports.update = function(req, res) {
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
};
