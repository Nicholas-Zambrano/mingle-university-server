const authenticate = require("../middleware/authenticate");
const express= require("express")
const router = express.Router();
const knex = require("knex")(require("../../knexfile"));

router.post("/", authenticate, async (req, res) => {
  // updating that speicfic user so need to get that user id
  const userId = req.user.id;

  // getting the updated details:
  const { hobbies, course, university, photo } = req.body;
  console.log("check");
  console.log(req.body);
  console.log("check");
  try {
    await knex("users").where({ id: userId }).update({
      hobbies,
      course,
      university,
      url:photo,
    });

    // fetching users uni
    // const updatedUser = await knex("users").where({id:userID}).first()
    // const userUniversity = updatedUser.university


    res.status(200).send("Profile updated successfully");
    // res.status(200).json({message:"profile updated successfully",university:userUniversity})

  } catch (error) {
    console.log(error);
    res.status(400).send("Unable to update profile");
  }
});

module.exports = router;
