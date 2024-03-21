var jwt = require("jsonwebtoken");
const privatekey = process.env.PRIVATEKEY;
const generateToken = async (id) => {
  console.log(privatekey);
  return await jwt.sign({ id }, "privatekey", { expiresIn: "1h" });
};
module.exports = generateToken;
