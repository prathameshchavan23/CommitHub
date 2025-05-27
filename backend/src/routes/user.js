const express = require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const mongoose = require("mongoose");
const USER_SAFE_DATA = "firstName lastName photoURL age gender about skills ";
// Get all the Pending requests of Logged-In users
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);
    //* Instead of just returning the "fromUserId", it fetches the "firstName" and "lastName" fields of the referenced user from the User collection.

    res.json({
      message: "Data fetched successfully",
      data: connectionRequests,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    console.log(connectionRequests);
    const data = connectionRequests
      .map((row) => {
        if (!row.fromUserId) {
          return row.toUserId; // If fromUserId is null, return toUserId as fallback
        }
        if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
          return row.toUserId;
        }
        return row.fromUserId;
      })
      .filter((user) => user !== null); // Remove null values

    res.json({ data });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// userRouter.get("/feed", userAuth, async (req, res) => {
//   try {
//     //? Users should see all Cards except
//     //*1 his own card
//     //*2 his connection
//     //*3 ignored people
//     //*4 already sent the connection request

//     const loggedInUser = req.user;
//     const page = parseInt(req.query.page) || 1;
//     let limit = parseInt(req.query.limit) || 10;
//     limit = limit > 50 ? 50 : limit;
//     const skip = (page - 1) * limit;

//     // Fetch all connection requests (friends, sent/received requests)
//     const connectionRequests = await ConnectionRequest.find({
//       $or: [{ toUserId: loggedInUser._id }, { fromUserId: loggedInUser._id }],
//     })
//       .populate("fromUserId", "_id")
//       .populate("toUserId", "_id");

//     // Create a Set of user IDs to hide from feed
//     const hideUsersFromFeed = new Set();
//     connectionRequests.forEach((req) => {
//       // Need to check if the populated fields exist before accessing toString
//       if (req.fromUserId && req.fromUserId._id) {
//         hideUsersFromFeed.add(req.fromUserId._id.toString());
//       }
//       if (req.toUserId && req.toUserId._id) {
//         hideUsersFromFeed.add(req.toUserId._id.toString());
//       }
//     });

//     // Add the logged-in user's ID to the set
//     hideUsersFromFeed.add(loggedInUser._id.toString());

//     // Find users who are NOT in the hidden set
//     const users = await User.find({
//       _id: {
//         $nin: Array.from(hideUsersFromFeed),
//       },
//     })
//       .select(USER_SAFE_DATA)
//       .skip(skip)
//       .limit(limit);

//     res.json({ data: users });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page = parseInt(req.query.page || 1);
    let limit = parseInt(req.query.limit || 10);
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    const connectionRequest = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");

    const hideUsersFromFeed = new Set();
    connectionRequest.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    res.send(users);
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

module.exports = userRouter;
