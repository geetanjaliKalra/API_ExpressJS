import express from "express";
const app = express();
app.use(express.json());

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

let id = 3;

app.get("/users", (req, res) => {
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
  const { name, mobile } = req.body;
  const newUser = {id: id++, name, mobile}
  users.push(newUser);
  console.log('user array ', users);
  
  res.status(201).json(newUser);
});

try {
  app.listen(3000, () => {
    console.log("Server is up and running");
  });
} catch (error) {
  console.error("inside catch", error);
}
