import express from "express";
import userModel from "./models/user.model.js";

export const userRoutes = express.Router();

// let users = [
//   { id: 1, name: "Alice" },
//   { id: 2, name: "Bob" },
// ];

// let id = 3;

userRoutes.get("/", async (req, res) => {
  const users = await userModel.find().select({ __v: 0 });
  res.json(users);
});

userRoutes.get("/:id", async (req, res) => {
  const userId = req.params.id;
  console.log("request recived to get user details for id: ", userId);
  // const user = users.filter((u) => u.id == userId);

  const userDB = await userModel.findOne({ _id: userId });

  if (!userDB) {
    console.log("No User found with id: ", userId);
    return res.json("No User found with id: " + userId);
  }
  return res.json(userDB);
});

userRoutes.post("/", async (req, res) => {
  try {
    const { name, mobile } = req.body;
    // if (!name || !mobile) {
    //   return res
    //     .status(400)
    //     .json({ error: true, message: "either name or mobile is missing" });
    // }
    // const newUser = { id: id++, name, mobile };
    // users.push(newUser);

    const userDB = await userModel.insertOne({ name, mobile });

    console.log(userDB);

    res.status(201).json(userDB);
  } catch (error) {
    console.log(error.message);

    return res
      .status(500)
      .json({ error: true, message: error.message || "internal server error" });
  }
});

userRoutes.delete("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res
        .status(400)
        .json({ error: true, message: "User Id is missing" });
    }
    const userDB = await userModel.deleteOne({ _id: userId });
    return res.json(userDB);
  } catch (error) {
    res
      .status(500)
      .json({ error: true, message: error.message || "Internal server error" });
  }
});

userRoutes.put("/", async (req, res) => {
  try {
    const { id, name, mobile } = req.body;
    const newUser = { name, mobile };

    const userDB = await userModel.findByIdAndUpdate(id, newUser, {
      new: true,
    });

    res.status(200).json(userDB);
  } catch (error) {
    res
      .status(500)
      .json({ error: true, message: error.message || "Internal server error" });
  }
});

userRoutes.patch("/", async (req, res) => {
  try {
    const { id, name, mobile } = req.body;
    if (!id) {
      return res.status(400).json("user id is missing");
    }

    const userDB = await userModel.findByIdAndUpdate(
      id,
      { name, mobile },
      { new: true }
    );

    res.status(200).json(userDB);
  } catch (error) {
    res
      .status(500)
      .json({ error: true, message: error.message || "Internal server error" });
  }
});
