import express from "express";
import jwt from "jsonwebtoken";
import { secretKey } from "../constant.js";
import userLogin from "./gmodels/user.loginmodel.js";

export const loginRoute = express.Router();

// const creds = {
//   user: "geetu",
//   password: "pass",
// };

loginRoute.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    const resultSet = await userLogin.findOne({ username, password });

    //==Matching using hardcoded data==
    // if (!(creds.user == username && creds.password == password)) {
    //   return res
    //     .status(401)
    //     .json({ error: true, message: "Invalid credentials" });
    // }

    //Verifying if data exists in DB

    if (!resultSet) {
      res.status(401).json({ error: true, message: "Invalid credentials" });
    }

    const payload = {
      user: username,
      role: resultSet.role,
    };
    console.log(payload);

    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
    return res.json(token);
  } catch (error) {
    return res.status(500).json({ error: true, message: error || "DB error" });
  }
});

// For inserting user login creds in DB

loginRoute.post("/register", async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const insertedData = await userLogin.insertOne({
      username,
      password,
      role,
    });

    return res.status(201).json(insertedData);
  } catch (error) {
    return res.status(500).json(error);
  }
});
