const User = require("../models/user");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

exports.register = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const encodedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: encodedPassword, role });
    res.status(201).json(user);
    transporter.sendMail(
      {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Welcome to our website",
        html: `
      <h1>Welcome to our website</h1>
      <p>Thanks for joining us</p>
      <p>We are glad to have you here</p>
      <p>We hope you enjoy your stay</p>
      <p>If you have any questions, please contact us at <EMAIL></p>
      <p>Thanks again</p>
      <p>Regards</p>
      <p>The Team</p>
      `,
      },
      (err, info) => {
        console.log("error", err);
        console.log("info", info);
      }
    );
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

exports.sendResetPasswordLink = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const token = crypto.randomBytes(32);
  if (!token) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
  user.reset_password_token = token.toString("hex");
  user.token_expire_time = Date.now() + 3600000;
  user.save();
  transporter.sendMail({
    from: process.env.SENDER_EMAIL,
    to: user.email,
    html: `
    <h1>Reset Password</h1>
    <p>Please click on the link below to reset your password</p>
    <p><a href="http://localhost:3000/reset_password/${user.reset_password_token}">Reset Password</a></p>
    <p>If you did not request for password reset, please ignore this email</p>
    `,
  });
  return res.status(200).json({ message: "Reset Password Link Sent" });
};
