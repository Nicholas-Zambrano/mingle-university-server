const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../../knexfile"));

router.post("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    // doing a delay of 20 seconds to auto accept
    setTimeout(async () => {
      // finding the pending request in the friend request table
      const pendingRequests = await knex("friend_requests")
        .where({ receiver_id: userId, status: "pending" })
        .select("id");

      // looping through the pending request
      for (let i = 0; i < pendingRequests.length; i++) {
        const requestId = pendingRequests[i].id; // identtifying the id of the pending requests

        await knex("friend_requests")
          .where({ id: requestId }) // filtering through the id column that matches that friend requeset id
          .update({ status: "accepted" }); //update status to accepted
      }
      console.log(pendingRequests);
      res
        .status(200)
        .json({ message: "Friend requests accepted successfully" });
    }, 20000);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
  }
});

module.exports = router;
