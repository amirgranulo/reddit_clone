import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from "cors";

import Post from "./models/Post.js";
import voting from "./routes/voting.js";
import subreddits from "./routes/subreddits.js";
import authentication from "./routes/authentication.js"
import posts from "./routes/posts.js";
const app = express();
import Subreddit from "./models/Subreddit.js";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(voting);
app.use(subreddits);
app.use(authentication);
app.use(posts);
const connectToDb = async () => {
  await mongoose.connect("mongodb://localhost:27017/reddit", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

connectToDb();
const db = mongoose.connection;

db.on("error", console.log);

app.get("/", (req, res) => {
  res.send("ok");
});


app.get("/search", async (req, res) => {
  const query = req.query.query;
  let postsSearchFilter = {
    $or: [
      { body: { $regex: ".*" + query + ".*" } },
      { title: { $regex: ".*" + query + ".*" } },
    ],
  };
  let subredditsSearchFilter = { title: { $regex: ".*" + query + ".*" } };
  try {
    const posts = await Post.find(postsSearchFilter).sort({ postedAt: -1 });

    const subreddits = await Subreddit.find(subredditsSearchFilter);
    console.info(subreddits);
    return res.json({ posts, subreddits });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});


app.listen(5000);
