import express from "express";

export const userRoutes = express.Router();

let users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

let id = 3;

userRoutes.get("/", (req, res) => {
  res.json(users);
});

userRoutes.get("/:id", (req, res) => {
  const userId = req.params.id;
  console.log("request recived to get user details for id: ", userId);
  const user = users.filter((u) => u.id == userId);

  if (!user.length) {
    console.log("No User found with id: ", userId);
    return res.json("No User found with id: " + userId);
  }
  return res.json(user[0]);
});

userRoutes.post("/", (req, res) => {
  try {
    const { name, mobile } = req.body;
    if (!name || !mobile) {
      return res
        .status(400)
        .json({ error: true, message: "either name or mobile is missing" });
    }
    const newUser = { id: id++, name, mobile };
    users.push(newUser);

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error.message);

    return res
      .status(500)
      .json({ error: true, message: error.message || "internal server error" });
  }
});

userRoutes.delete("/:id", (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res
        .status(400)
        .json({ error: true, message: "User Id is missing" });
    }
    users = users.filter((u) => u.id != userId);
    res.status(200).json({
      error: false,
      message: `If User with id ${userId} exists then it is deleted successfully`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: true, message: error.message || "Internal server error" });
  }
});

userRoutes.put("/", (req, res) => {
  try {
    const { id, name, mobile } = req.body;
    const newUser = { id, name, mobile };
    users = users.map((u) => (u.id == id ? newUser : u));
    res
      .status(200)
      .json({ error: false, message: "User updated successfully", users });
  } catch (error) {
    res
      .status(500)
      .json({ error: true, message: error.message || "Internal server error" });
  }
});

userRoutes.patch("/", (req, res) => {
  try {
    const { id, name, mobile } = req.body;
    if (!id) {
      return res.status(400).json("user id is missing");
    }
    const newUser = {};
    name ? (newUser.name = name) : newUser;
    mobile ? (newUser.mobile = mobile) : newUser;

    users = users.map((u) => (u.id == id ? { ...u, ...newUser } : u));
    res
      .status(200)
      .json({ error: false, message: "User updated successfully", users });
  } catch (error) {
    res
      .status(500)
      .json({ error: true, message: error.message || "Internal server error" });
  }
});
