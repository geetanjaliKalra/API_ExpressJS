import express from "express";
// import { authMiddleware } from "./authMiddleware.js";
import { userRoutes } from "./user.js";
import { authMiddlewareJWT } from "./authMiddlewareJWT.js";
import { loginRoute } from "./login.js";
import mongoose from "mongoose";
import { MONGO_URI } from "./dbCreds.js";

const app = express();

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB with Mongoose"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use(express.json());

app.use("/login", loginRoute);
app.use(authMiddlewareJWT);
app.use("/users", userRoutes);

app.listen(3000, (error) => {
  if (error) {
    console.error("inside listen callback", error);
  } else {
    console.log("Server is up and running");
  }
});
