const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const cryptoAccessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;
  try {
    if (cryptoAccessToken) {
      const decoded = jwt.decode(cryptoAccessToken, process.env.JWT_SEC);

      // Check if the token has expired
      if (decoded.exp < Date.now() / 1000 || decoded === null) {
        if (!refreshToken) {
          return res
            .status(400)
            .json({ message: "Refresh token non presente" });
        }
        const refresh = jwt.verify(refreshToken, process.env.JWT_SEC);
        const arrayToken = refreshToken.split(".");
        const tokenPayload = JSON.parse(atob(arrayToken[1]));
        // Check if the token has expired
        if (refresh.exp < Date.now() / 1000) {
          res.clearCookie("refreshToken");
          return res.status(401).json({ message: "Token has expired" });
        } else {
          const accessToken = jwt.sign(
            {
              userGrade: tokenPayload.userGrade,
              userId: tokenPayload.userId,
            },
            process.env.JWT_SEC,
            {
              expiresIn: "1m",
            }
          );

          res.cookie("accessToken", accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 1,
            httpOnly: true,
            sameSite: "none",
            secure: true,
          });
        }
      }
      next();
    } else {
      if (!refreshToken) {
        return res.status(403).json({ message: "Refresh token non presente" });
      }
      const refresh = jwt.verify(refreshToken, process.env.JWT_SEC);
      const arrayToken = refreshToken.split(".");
      const tokenPayload = JSON.parse(atob(arrayToken[1]));
      // Check if the token has expired
      if (refresh.exp < Date.now() / 1000) {
        res.clearCookie("refreshToken");
        return res.status(401).json({ message: "Token has expired" });
      } else {
        const accessToken = jwt.sign(
          {
            userGrade: tokenPayload.userGrade,
            userId: tokenPayload.userId,
          },
          process.env.JWT_SEC,
          {
            expiresIn: "1m",
          }
        );

        res.cookie("accessToken", accessToken, {
          maxAge: 1000 * 60 * 60 * 24 * 1,
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });
      }
    }
    next();
  } catch (err) {
    res.clearCookie("accessToken");
    console.log(err);
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;
