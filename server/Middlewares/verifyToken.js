const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({ message: "Access token required" });
  }

  const token = authHeader.split(" ")[1]; // Estrai il token da "Bearer <token>"

  try {
    const decoded = jwt.verify(token, process.env.JWT_SEC);
    req.user = decoded;
    return next(); // Token valido, procedi
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = verifyToken;