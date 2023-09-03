const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../../knexfile"));

router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    //getting user with that specific id from the database
    const user = await knex("users").where("id", userId).first();
    console.log("single student");
    console.log(user);
    console.log("received the data from single student card ");

    // const student = {
    //     id: user.id,
    //     first_name: user.first_name,
    //     last_name: user.last_name,
    //     hobbies: user.hobbies,
    //     course: user.course,
    //   };
    //   res.json(student)

    res.json(user);
    // if user is not found
    if (!user) {
      return res.status(404).json({ error });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
  }
});

module.exports = router;
