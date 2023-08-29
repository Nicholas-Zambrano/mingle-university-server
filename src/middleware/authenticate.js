const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization");

  // after retrieving the token from the header, if the toekn is not provided, then it lacks authentication
  if (!token) {
    return res.status(401).send("Please login");
  }

  // Acessing the actual JWT token:
  const authToken = token.split(" ")[1];
  console.log(authToken);

  // verifying the token:
  try {
    const decoded = jwt.verify(authToken, process.env.JWT_KEY);
    // if verification successful the JWT token is assigned to the req.user
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).send("Token verification failed");
  }
};
