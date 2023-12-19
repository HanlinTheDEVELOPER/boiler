const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const encodedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: encodedPassword });
    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }
    req.session.isLogin = true;
    req.session.userInfo = user;
    req.session.save(() => {
      return res.status(200).json(user);
    });
  } catch (error) {
    console.log(error);
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    return res.status(200).json({
      message: "Logout Successful",
    });
  });
};
