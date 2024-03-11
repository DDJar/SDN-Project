var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");
var User = new Schema({
  firstname: {
    type: String,
    require: true,
  },
  lastname: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    default: "",
  },
  email: {
    type: String,
  },
  certicate: {
    type: String,
    default: "",
  },
  imgAvt: {
    type: String,
    default: "https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg"
  },
  gender: {
    type: String,
    default: "",
  },
  phoneNumber: {
    type: String,
    default: "",
  },
  dob: {
    type: Date,
  },
  facebookId: String,
  admin: {
    type: Boolean,
    default: false,
  },
});
User.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", User);