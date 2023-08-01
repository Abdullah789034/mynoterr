const jwt = require("jsonwebtoken");
const JWT_Sec = "I am a boy.";

const fetchuser = (req, res, next) => { 
  //decoding jwb token
  const token = req.header("auth-token"); 
  if (!token) {
    res.staus(401).send({ error: "Invalid token." });
  }
  try {
    const data = jwt.verify(token, JWT_Sec);
    req.user = data.user;
    next();
  } catch (error) {
    res.staus(401).send({ error: "Invalid token." });
  }
};

module.exports = fetchuser;
