var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var User = new Schema({
    firstname: {
        type: String,
          default: ''
      },
      lastname: {
        type: String,
          default: ''
      },
      address: {
        type: String,
          default: ''
      },
      email: {
        type: String,
          default: ''
      },
      certicate: {
        type: String,
          default: ''
      },
      imgAvt: {
        type: String,
          default: ''
      },
      gender: {
        type: String,
          default: ''
      },
      phoneNumber: {
        type: String,
          default: ''
      },
      dob: {
        type: Date,
          default: ''
      },
      facebookId: String,
    admin:   {
        type: Boolean,
        default: false
    }
});
User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);
