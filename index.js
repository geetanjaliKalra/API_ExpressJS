import express from "express";
// import { authMiddleware } from "./authMiddleware.js";
import { userRoutes } from "./user.js";
import { authMiddlewareJWT } from "./authMiddlewareJWT.js";
import { loginRoute } from "./login.js";

const app = express();

app.use(express.json());

app.use("/login", loginRoute);
app.use(authMiddlewareJWT);
app.use("/users", userRoutes);

try {
  app.listen(3000, () => {
    console.log("Server is up and running");
  });
} catch (error) {
  console.error("inside catch", error);
}
