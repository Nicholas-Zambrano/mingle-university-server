require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const userRoutes = require("./routes/usersData");
const updateProfileRoutes = require("./routes/updateProfile");
const PORT = process.env.PORT;

// Middleware:
app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/my-profile", profileRoutes);
app.use("/users", userRoutes);
app.use("/update-profile", updateProfileRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
