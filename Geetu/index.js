import express from "express";
import { authMiddleware } from "./basicAuthMiddleWare.js";
import { gUserRoute } from "./geetuUsers.js";
import { jwtMiddleware } from "./jwtMiddleWare.js";
import { loginRoute } from "../gLogin.js";
const app = express();
app.use(express.json());
//app.use(authMiddleware);
app.use("/login", loginRoute);
app.use(jwtMiddleware);
app.use("/users", gUserRoute);

// const cred = {
//   user: "geetu",
//   pass: "pass",
// };

// let users = [
//   { id: 1, name: "Alice" },
//   { id: 2, name: "Bob" },
// ];

// const authMiddleware = (req, res, next) => {
//   try {
//     const authHeader = req.header("Authorization");
//     if (!authHeader) {
//       return res
//         .status(400)
//         .json({ error: true, message: "Authorization required" });
//     }
//     const base64Credentials = authHeader.split(" ")[1];
//     const credentials = Buffer.from(base64Credentials, "base64").toString(
//       "utf-8"
//     );
//     const [username, password] = credentials.split(":");

//     if (!(username == cred.user && password == cred.pass)) {
//       return res
//         .status(401)
//         .json({ error: true, message: "Invalid credentials" });
//     }
//     next();
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: true, message: error || "Unknown error" });
//   }
// };

// app.get("/users", (req, res) => {
//   return res.status(200).json(users);
// });

app.listen(3000, (error) => {
  if (error) {
    console.error("inside listen callback", error);
  } else {
    console.log("Server is up and running");
  }
});
