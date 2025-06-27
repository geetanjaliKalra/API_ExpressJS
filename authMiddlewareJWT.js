import jwt from "jsonwebtoken";
import { secretKey } from "./constant.js";

export function authMiddlewareJWT(req, res, next) {
  try {
    const authHeader = req.header("Authorization");
    // if auth header is missing, send error
    if (!authHeader) {
      return res.status(400).json({ error: true, message: "Auth missing" });
    }

    const token = authHeader.split(" ")[1];
    try {
      const payload = jwt.verify(token, secretKey);
      console.log("token verified, payload: ", payload);
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: true, message: "Wrong Token" });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, message: "Unknown Error" });
    // next(error);
  }
}
