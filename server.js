require("dotenv").config();
const express = require("express");
const app = express ();
const cors = require("cors");

const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile")