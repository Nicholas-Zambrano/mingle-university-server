const router = require("express").Router();
const knex = require("knex")(require("../../knexfile"));
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// need to create a route that handles user registration
router.post("/register", async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  //   hashing the password
  const hashedPassword = await bcrypt.hash(password,10);

  // creating the user
  const newUser = {
    first_name,
    last_name,
    email,
    password: hashedPassword,
  };

  // insert the users data into the database:
  try {
    await knex("users").insert(newUser);
    res.status(201).send("registered Successfully");
  } catch (error) {
    console.error(error);
    res.status(401).send("Failed registration");
  }
});

// creating post for user login:
router.post("/login", async (req, res) => {
  // what the user passed in
  const { email, password } = req.body;

  // check if the user entered the login prompt:
  if (!email || !password) {
    return res.status(401).send("enter the required fields");
  }

  // need to find the user in the database:
  const user = await knex("users").where({ email }).first();

  // if we cant find the user
  if (!user) {
    return res.status(401).json({ message: "invalid email" });
  }

  // comparing the password:
  const passwordMatch = await bcrypt.compare(password, user.password);
  // if password doesnt match
  if (!passwordMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_KEY,
    { expiresIn: "24h" }
  );
  res.json({token})
});

module.exports = router;