const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../../knexfile"));
// const seedFile = require("../../seeds/users");
const usersSeed = require("../../seeds/users");

router.post("/seeded-users", async (req, res) => {
  /* responding to the data which we got from the client:
    -> expecting some urls
*/

  // holding the data sent by the client
  const { studentPhotos } = req.body;
  try {
    // const seededUsers = await knex("users").select("*");
    // looped over the Studentphotos array and getting the URL
    const urls = studentPhotos.map((photo) => {
      return photo.src.medium;
    });

    // const seedData = {photos:urls}

    // the url's we received we need to pass it to the seed file:
    console.log("URLs before passing to seed:", urls);
    // await usersSeed.seed(knex, urls);
    await usersSeed.seed(knex, { studentPhotos: urls });

    // transorfming each url into an object with the URL property
    // await knex("users").insert(urls.map(url=>{
    //     return({url})
    // }));
    // await knex("users").insert(
    //   urls.map((url) => {
    //     return {
    //       first_name: "e", // Provide a default value or actual data
    //       last_name: "e", // Provide a default value or actual data
    //       address: "e", // Provide a default value or actual data
    //       phone: "1", // Provide a default value or actual data
    //       email: "e", // Provide a default value or actual data
    //       password: "s", // Provide a default value or actual data
    //       course: "3", // Provide a default value or actual data
    //       hobbies: "w", // Provide a default value or actual data
    //       university: "w", // Provide a default value or actual data
    //       url: url,
    //     };
    //   })
    // );

    // const seedData = [];
    // for (const url of urls) {
    //   const user = {
    //     firstName: faker.name.firstName(),
    //     last_name: faker.name.lastName(),
    //     address: faker.address.streetAddress(),
    //     phone: faker.phone.phoneNumber(),
    //     email: `${faker.name.firstName()}${faker.name.lastName()}@gmail.com`,
    //     password: faker.internet.password(),
    //     course: faker.random.arrayElement(courses),
    //     hobbies: faker.random.arrayElement(hobbies),
    //     university: faker.random.arrayElement(ukUniversities),
    //   };
    //   users.push(user);
    // }
    // console.log(seedData);
    // await knex("users").insert(seedData);

    res.status(200).send("phto stored in the database");
    // res.json(seededUsers);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
