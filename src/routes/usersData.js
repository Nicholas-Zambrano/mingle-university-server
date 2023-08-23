const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../../knexfile"));

router.get("/seeded-users", async (req, res) => {
  /* responding to the data which we got from the client:
    -> expecting some urls
*/
  const { studentPhotos } = req.body;
  try {
    // const seededUsers = await knex("users").select("*");
    // looped over the photos we got
    const urls = studentPhotos.map((photo)=>{
        return(photo.src.medium);
    })
    await knex ("users")
    
    res.json(seededUsers);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
