import express from "express";
const app = express();
app.use(express.json());

const key = "abc";

let users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

let id = 3;

app.get("/users", (req, res) => {
  const token = req.header("key");
  if (token !== key) {
    res.status(401).json({ error: true, message: "invalid key" });
  }
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  console.log("request recived to get user details for id: ", userId);
  const user = users.filter((u) => u.id == userId);

  if (!user.length) {
    console.log("No User found with id: ", userId);
    return res.json("No User found with id: " + userId);
  }
  return res.json(user[0]);
});

app.post("/users", (req, res) => {
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

try {
  app.listen(3000, () => {
    console.log("Server is up and running");
  });
} catch (error) {
  console.error("inside catch", error);
}

app.delete("/users/:id", (req, res) => {
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

app.put("/users", (req, res) => {
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

app.patch("/users", (req, res) => {
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
