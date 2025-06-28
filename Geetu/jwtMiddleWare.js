import jwt from "jsonwebtoken";
import { secretKey } from "../constant.js";

export const jwtMiddleware = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return res.status(400).json({ error: true, message: "Auth missing" });
    }
    const token = authHeader.split(" ")[1];

    try {
      const payload = jwt.verify(token, secretKey);
      console.log("payload is ==== ", payload);
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: true, message: "Wrong token" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, message: "Unknown error" });
  }
};
