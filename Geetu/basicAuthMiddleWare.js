const cred = {
  user: "geetu",
  pass: "pass",
};

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res
        .status(400)
        .json({ error: true, message: "Authorization required" });
    }
    const base64Credentials = authHeader.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString(
      "utf-8"
    );
    const [username, password] = credentials.split(":");

    if (!(username == cred.user && password == cred.pass)) {
      return res
        .status(401)
        .json({ error: true, message: "Invalid credentials" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: error || "Unknown error" });
  }
};
