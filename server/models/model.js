const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost/mongoose_dash", {
//   useNewUrlParser: true
// });

const OwlSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Must have a name"], minlength: 1 },
    age: { type: Number, min: 1 }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Owl", OwlSchema);
