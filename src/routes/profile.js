const router = require("express").Router();
const jwt = require("jsonwebtoken");
const knex = require("knex")(require("../../knexfile"));

// getting information about the logged in user

router.get("/user", async (req, res) => {
  // checking if the user is authenticated before accessing their user profile endpoint:
  if (!req.headers.authorization) {
    res.status(401).send("Please login");
    return;
  }

  //accessing the actual token sent by the client
  const authToken = req.headers.authorization.split(" ")[1];

  //   need to verify the token by the server , then we can access that user's as the token will be decoded
  try {
    const decodedToken = jwt.verify(authToken, process.env.JWT_KEY);
    // before sending the user's data in the response
    // remove their password:

    const user = await knex("users").where({ id: decodedToken.id });
    delete user.password;
    res.json(user);
  } catch (error) {
    console.error(error);
  }
});
module.exports = router;
