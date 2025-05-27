const mongoose = require("mongoose");

const connectRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: "{VALUE} is an incorrect status type", // ✅ Correct way
      },
    },
  },
  {
    timestamps: true,
  }
);

connectRequestSchema.index({ fromUserId: 1, toUserId: 1 });

connectRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("Cannot send connection request to Yourself");
  }
  next();
});

const connectRequestModel = new mongoose.model(
  "ConnectionRequest",
  connectRequestSchema
);

module.exports = connectRequestModel;
