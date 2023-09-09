const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../../knexfile"));
const authenticate = require("../middleware/authenticate");

router.post("/:id", authenticate, async (req, res) => {
  try {
    const senderUserId = req.user.id; // getting the id of the authenticad user whos sending the friend request
    const receiverUserId = req.params.id;
    const { comment } = req.body; // the comment the user sent

    const senderExists = await knex("users").where("id", senderUserId).first();

    const receiverExists = await knex("users")
      .where("id", receiverUserId)
      .first();

    // checking if there is already an existing request:
    const existingRequest = await knex("friend_requests")
      .where({
        sender_id: senderUserId,
        receiver_id: receiverUserId,
      })
      // checking if the fake user already sent a friend requests(good practice)
      .orWhere({
        sender_id: receiverUserId,
        receiver_id: senderUserId,
      });

    if (!senderExists || !receiverExists) {
      return res.status(404).json({ error: "Sender or receiver not found" });
    }

    // checking if there is already a friend request
    if (existingRequest.length > 0) {
      return res
        .status(400)
        .json({ error: "Friend request has already been sent" });
    }

    // inserting the friend request to new friend request table
    await knex("friend_requests").insert({
      sender_id: senderUserId,
      receiver_id: receiverUserId,
      comment: comment,
    });
    res.status(200).json({ message: "Friend request sent successfully" });
    console.log(senderUserId);
    console.log(receiverUserId);
    console.log(comment);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Failed to send friend request" });
  }
});

module.exports = router;
