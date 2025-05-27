const express = require("express");
const authRouter = express.Router();
const { validateSignUpdate } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  try {
    //* Validation of data 
    validateSignUpdate(req);

    //* Hashing password before saving it
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);// 10 represents the salt rounds.

    // * Creating an instance of the User Model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    const savedUser = await user.save(); // * It gives a promise
    const token = await savedUser.getJWT();
    // * Added token to JWT
    res.cookie("token", token, {
      expires: new Date(Date.now() + 24 * 3600000),
    });

    res.json({
      message: "User created successfully",
      data: savedUser,
    })


  } catch (err) {
    res.status(400).send("Error " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId }); // to check in database that this emailId exists or not
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await user.validatePassword(password)
    if (isPasswordValid) {
      // * Generate JWT token for user 
      const token = await user.getJWT();

      // * Added token to JWT
      res.cookie("token", token, {
        expires: new Date(Date.now() + 24 * 3600000),
      });

      res.send(user);
    } else {
      throw new Error(" Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("Error " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  })
  res.send("Logged out successfully")
})

module.exports = { authRouter };
