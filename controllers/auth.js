exports.login = (req, res) => {
  req.session.isLogin = true;
  res.status(200).json({
    message: "Login Successful",
  });
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.status(200).json({
      message: "Logout Successful",
    });
  });
};
