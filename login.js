import express from "express";
import jwt from "jsonwebtoken";

export const loginRoute = express.Router();

import { secretKey } from "./constant.js";
import loginModel from "./models/login.model.js";

// const creds = {
//   user: "geetu",
//   password: "pass",
// };

loginRoute.post("/", async (req, res) => {
  const { username, password } = req.body;

  // if (!(user == creds.user && password == creds.password)) {
  //   return res
  //     .status(401)
  //     .json({ error: true, message: "Invalid credentials" });
  // }

  const userDB = await loginModel.find({ username, password });

  if (!userDB.length) {
    return res
      .status(401)
      .json({ error: true, message: "Invalid credentials" });
  }

  //generate token
  const payload = {
    username,
    role: ["admin"],
  };
  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

  return res.json({
    error: false,
    token,
  });
});
