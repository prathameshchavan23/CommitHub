const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    // * Read token from request cookies
    const { token } = req.cookies;
    //? If req.cookies doesn’t contain token, it means the user is not authenticated.

    if (!token) {
      return res.status(401).json({ error: "Please Login!" });
    }
    // * Verify token
    const decodeObj = await jwt.verify(token, process.env.JWT_SECRET);

    const { _id } = decodeObj; //* to get User ID at console
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user; //* req.user makes the authenticated user’s data available in routes that require authentication.
    //* This means the next function in the route will execute.
    next();
  } catch (err) {
    res.status(400).send("Error " + err.message);
  }
};

module.exports = {
  userAuth,
};
