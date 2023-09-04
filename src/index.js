require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const userRoutes = require("./routes/usersData");
const updateProfileRoutes = require("./routes/updateProfile");
const students = require("./routes/students");
const savePotentialMatch = require("./routes/savePotentialMatch");
const specificStudent = require("./routes/singleStudent");
const friendRequest = require("./routes/friend-request");
const acceptRequst = require("./routes/acceptRequest");
const PORT = process.env.PORT;

// Middleware:
app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/my-profile", profileRoutes);
app.use("/users", userRoutes);
app.use("/update-profile", updateProfileRoutes);
app.use("/students", students);
app.use("/potential-match", savePotentialMatch);
app.use("/student", specificStudent);
app.use("/send-friend-request", friendRequest);
app.use("/auto-accept", acceptRequst);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
