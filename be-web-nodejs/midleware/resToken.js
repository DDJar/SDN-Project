var authenticate = require("../authenticate");

async function resToken(req, res, next) {
  var token = authenticate.getToken({ _id: req.user._id });
  if(req.user.lastName ===undefined){
    req.user.lastName = " "
  }
  if(req.user.firstName ===undefined){
    req.user.firstName = " "
  }
  const info = {
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    imgAvt: req.user.imgAvt,
    admin: req.user.admin,
    username: req.user.firstName + " " + req.user.lastName,
  };
  res.cookie("token", token);
  res.cookie("info", JSON.stringify(info));
  res.cookie("username", info.username);
  res.redirect(`http://localhost:3000`);
}

module.exports = resToken;