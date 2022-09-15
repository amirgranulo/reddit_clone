import mongoose from "mongoose";

const Subreddit = mongoose.model(
  "Subreddit",
  new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    profilePictureUrl: { type: String, required: true },
    coverPictureUrl: { type: String, required: true },
    author : {type: String,required: true}
  })
);

export default Subreddit;
