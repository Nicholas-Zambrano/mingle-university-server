const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../../knexfile"));
// const seedFile = require("../../seeds/users");
const usersSeed = require("../../seeds/users");

router.get("/seeded-users", async (req, res) => {
  try {
    // getting the data stored in the users table
    const seededUsers = await knex("users").select("*");
    res.json(seededUsers);
  } catch (error) {
    console.log("error getting seeded users", error);
    res.status(500).json({ error: "server error" });
  }
});

module.exports = router;
