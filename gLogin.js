import express from "express";
import jwt from "jsonwebtoken";
import { secretKey } from "./constant.js";

export const loginRoute = express.Router();

const creds = {
  user: "geetu",
  password: "pass",
};

loginRoute.post("/", (req, res) => {
  const { username, password } = req.body;

  if (!(creds.user == username && creds.password == password)) {
    return res
      .status(401)
      .json({ error: true, message: "Invalid credentials" });
  }

  const payload = {
    user: username,
    role: ["admin"],
  };

  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
  return res.json(token);
});
