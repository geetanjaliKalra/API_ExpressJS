import express from "express";
const app = express();

const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  console.log('request recived to get user details for id: ', userId);
  const user = users.filter((u) => u.id == userId);
  
  if(!user.length) {
    console.log('No User found with id: ', userId);
    return res.json('No User found with id: '+ userId);
    
  }
  return res.json(user[0]);

});

try {
  app.listen(3000, () => {
    console.log("Server is up and running");
  });
} catch (error) {
  console.error("inside catch", error);
}
