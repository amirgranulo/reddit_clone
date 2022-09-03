import mongoose from "mongoose";

const Post = mongoose.model(
  "Post",
  new mongoose.Schema({
    author : {type:String,required : true},
    title: { type: String, required: false },
    body: { type: String, required: true },
    postedAt: { type: Date, required: true },
    commentParentId : {type: mongoose.ObjectId, required: false},
    postId : {type : mongoose.ObjectId, required : false}
  })
);

export default Post;
