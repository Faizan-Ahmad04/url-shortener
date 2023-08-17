const User = require("../models/user");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await User.insertMany({
    name,
    email,
    password,
  });

  return res.render("home",{
    name:name,
  });
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.find({ email});
  console.log(email);
  console.log(password);

  if (!user)
    return res.render("login", { error: "Invalid user name and password" });

  return res.render("home");
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};
