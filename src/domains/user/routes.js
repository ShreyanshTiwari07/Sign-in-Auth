const express = require("express");
const router = express.Router();
const { createNewUser, authenticateUser } = require("./controller");

//sign in
router.post("/", async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.trim();
    password = password.trim();
    if (!(email && password)) {
      throw Error("Empty credentials");
    }

    const authenticatedUser = await authenticateUser({ email, password });
    res.status(200).json(authenticatedUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//signup
router.post("/signup", async (req, res) => {
  try {
    let { name, email, password, enroll } = req.body;
    name = name.trim();
    email = email.trim();
    password = password.trim();
    enroll = enroll.trim();

    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    if (!(name && email && password && enroll)) {
      throw new Error("Empty input fields");
    } else if (!isValidEmail(email)) {
      throw new Error("Invalid email format");
    } else if (password.length < 8) {
      throw new Error("Password is too short");
    } else {
      const newUser = await createNewUser({
        name,
        email,
        password,
        enroll,
      });
      res.status(200).json(newUser);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
