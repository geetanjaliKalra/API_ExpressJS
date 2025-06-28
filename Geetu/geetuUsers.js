import express from "express";
import userModel from "./gmodels/new.usermodel.js";
export const gUserRoute = express.Router();

// let users = [
//   { id: 1, name: "Alice" },
//   { id: 2, name: "Bob" },
// ];

gUserRoute.get("/", async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
});
gUserRoute.get("/:userid", async (req, res) => {
  try {
    const userId = req.params.userid;
    const users = await userModel.findOne({ userId: userId });
    if (!users) {
      return res.status(204).json();
    }
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
});
gUserRoute.post("/", async (req, res) => {
  try {
    const { name, mobile } = req.body;
    const users = await userModel.insertOne({ name, mobile });
    return res.status(201).json(users);
  } catch (error) {
    console.log(error);

    return res.status(500).json(error);
  }
});
gUserRoute.put("/", async (req, res) => {
  try {
    const { id, name, mobile } = req.body;
    const users = await userModel.findOneAndUpdate(
      { _id: id },
      { name, mobile },
      { new: true }
    );
    return res.status(201).json(users);
  } catch (error) {
    console.log(error);

    return res.status(500).json(error);
  }
});
gUserRoute.patch("/", async (req, res) => {
  try {
    const { id, name, mobile } = req.body;
    const users = await userModel.findOneAndUpdate(
      { _id: id },
      { name, mobile },
      { new: true }
    );
    return res.status(201).json(users);
  } catch (error) {
    console.log(error);

    return res.status(500).json(error);
  }
});
