var authenticate = require("../authenticate");

async function resToken(req, res, next) {
  var token = authenticate.getToken({ _id: req.user._id });
  const info = {
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    imgAvt: req.user.imgAvt,
    admin: req.user.admin,
    username:  req.user.firstName +' '+req.user.lastName,
  };
  // res.statusCode = 200;
  // res.setHeader("Content-Type", "application/json");
  // res.json({ success: true, token: token, info: info ,username :info.username});
  res.redirect(`http://localhost:3000/?user=${encodeURIComponent(token)}&username=${encodeURIComponent(info.username)}`);
}

module.exports = resToken;
