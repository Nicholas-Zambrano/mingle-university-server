const express = require("express");
const router = express.Router();

const temporaryPotentialMatches = [];

router.post("/save", (req, res) => {
  const potentialMatch= req.body;

  console.log(potentialMatch);
  temporaryPotentialMatches.push(potentialMatch)
  console.log(temporaryPotentialMatches);
  res.status(200).json({ message: "Potential match saved successfully" });
});

router.get("/get",(req,res)=>{
    res.status(200).json(temporaryPotentialMatches)
})

module.exports = router;
