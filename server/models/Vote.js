import mongoose from "mongoose";

const Vote = mongoose.model(
  "Vote",
  new mongoose.Schema({
    username: { type: String, required: true },
    postId : {type : mongoose.ObjectId, required : false},
    type : {type : Number, required : true},

  })
);

export default Vote;
