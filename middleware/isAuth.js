const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (!decoded) {
      return res.status(401).json({ message: "Invalid access" });
    }
    req.id = decoded.userId;
    next();
  } catch (error) {
    console.log(error)
  }
}

module.exports = isAuth;