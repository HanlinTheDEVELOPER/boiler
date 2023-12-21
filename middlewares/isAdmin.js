exports.isAdmin = (req, res, next) => {
  console.log(req.session.userInfo);
  if (req.session.userInfo.role === "admin") {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};
