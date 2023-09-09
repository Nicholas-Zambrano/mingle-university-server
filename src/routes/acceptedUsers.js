const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../../knexfile"));

router.get("/", async (req, res) => {
  try {
    const acceptedUsers = await knex("users")
      // returning rows where id columns from users tables = mthces the sender_id column in the friend_request table
      .join("friend_requests", "users.id", "=", "friend_requests.receiver_id")
      // condition: friend request column contains the status 'accepted'
      .where("friend_requests.status", "=", "accepted")
      // select the columns => first_name and last_name
      .select("receiver_id","users.first_name", "users.last_name");
    res.status(200).json(acceptedUsers);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
  }
});

module.exports = router;
