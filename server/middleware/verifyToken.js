const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "No Session!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'Strict',
      secure: true,
    });
    return res.status(401).json({ message: "Session expired" });
  }
}

module.exports = verifyToken;