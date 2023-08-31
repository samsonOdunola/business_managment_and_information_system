const jwt = require("jsonwebtoken");

const adminAuth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const verifiedUser = jwt.verify(token, process.env.SECRET);

      const { priviledges } = verifiedUser.user;

      if (!["Admin"].includes(priviledges)) {
        return res.status(401).json({
          message: "ACCESS DENIED.",
        });
      }
      next();
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "No token!" });
  }
};
const teamLeadAuth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const verifiedUser = jwt.verify(token, process.env.SECRET);

      const { priviledges } = verifiedUser.user;

      if (!["Admin", "Team Leader"].includes(priviledges)) {
        return res.status(401).json({
          message: "ACCESS DENIED.",
        });
      }
      next();
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "No token!" });
  }
};

module.exports = { adminAuth, teamLeadAuth };
