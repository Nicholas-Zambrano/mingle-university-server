const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../../knexfile"));

// creating a router that handles the sprecific students 

router.get("/", async(req,res)=>{
    try{
        // accessing the specified university in the requestested url from client
        const university = req.query.university;

        // need to get students from that uni from database
        // search only the university column that matches the university value from the url
        const students = await knex("users").where("university",university);
        console.log(students);
        res.json(students)
    }
    catch(error){
        console.log("error getting students",error);
        res.status(400).json({error})
    }
})

module.exports = router;


