require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const userRoutes = require("./routes/usersData")
const PORT = process.env.PORT || 8080;

// Middleware:
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/myProfile",profileRoutes)
app.use("/users",userRoutes)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
