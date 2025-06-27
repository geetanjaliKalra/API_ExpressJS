const creds = {
  user: "geetu",
  password: "pass",
};

export function authMiddleware(req, res, next) {
  try {
    const authHeader = req.header("Authorization");
    // if auth header is missing, send error
    if (!authHeader) {
      return res.status(400).json({ error: true, message: "Auth missing" });
    }

    const base64Value = authHeader.split(" ")[1];
    const plainValue = Buffer.from(base64Value, "base64").toString("utf-8");
    const user = plainValue.split(":")[0];
    const password = plainValue.split(":")[1];

    // match id password
    if (!(user == creds.user && password == creds.password)) {
      return res
        .status(401)
        .json({ error: true, message: "Invalid credentials" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, message: "Unknown Error" });
    // next(error);
  }
}
