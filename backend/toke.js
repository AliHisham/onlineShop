const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  jwt.sign({ id }, "secreeet", { expiresIn: "20d" });
};

module.exports = generateToken;
