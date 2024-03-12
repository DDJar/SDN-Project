var User = require("../models/users");

async function upsert(userInfo) {
  let user = null;
  try {
    user = await User.findOne({ email: userInfo.email });
    if (!user) {
      user = await User.create(userInfo);
    }
  } catch (error) {
    console.log(error);
  }
  return user;
}

module.exports = {
  upsert,
};
