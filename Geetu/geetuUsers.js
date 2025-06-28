import express from "express";

export const gUserRoute = express.Router();

let users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

gUserRoute.get("/", (req, res) => {
  return res.status(200).json(users);
});
