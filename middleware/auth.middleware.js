// check if User is login

import jwt from "jsonwebtoken";
import config from "config";

export default (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {

    const token = req.headers.authorization.split(' ')[1]; // "Bearer TOKEN"

    if (!token) {
      return res.status(401).json({ message: "No authorization" });
    }

    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded;
    next();

  } catch (e) {
    res.status(401).json({ message: "No authorization" });
  }
};