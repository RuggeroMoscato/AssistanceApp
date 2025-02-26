const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const refreshToken = req.headers["x-refresh-token"]; // Refresh token sent from the frontend

  if (!authHeader) {
    return res.status(403).json({ message: "Access token required" });
  }

  const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

  try {
    const decoded = jwt.verify(token, process.env.JWT_SEC);
    req.user = decoded;
    return next(); // Valid access token, proceed
  } catch (err) {
    if (err.name === "TokenExpiredError" && refreshToken) {
      try {
        const decodedRefresh = jwt.verify(refreshToken, process.env.JWT_SEC);

        // Generate a new access token
        const newAccessToken = jwt.sign(
          { userId: decodedRefresh.userId, userGrade: decodedRefresh.userGrade },
          process.env.JWT_SEC,
          { expiresIn: "15m" }
        );

        return res.status(200).json({ accessToken: newAccessToken });
      } catch (refreshErr) {
        return res.status(401).json({ message: "Refresh token expired, login again" });
      }
    }

    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = verifyToken;