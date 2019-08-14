module.exports = function(app){
  const controller = require("../controllers/controller")
  app.get("/", controller.index);
  app.post("/create", controller.create);
  app.get("/new", controller.new);
  app.get("/destroy/:id", controller.destroy);
  app.get("/edit/:id", controller.edit);
  app.get("/:id", controller.update);
}

