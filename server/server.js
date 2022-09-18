import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "./models/User.js";
import Post from "./models/Post.js";
import voting from "./voting.js";
import subreddits from "./subreddits.js";
const secret = "secret";
const app = express();
import { getUserFromToken } from "./utils/UserUtils.js";
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

app.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  console.log(hashedPassword);
  const user = new User({
    email: email,
    username: username,
    password: hashedPassword,
  });
  user
    .save()
    .then(() => {
      jwt.sign({ id: user._id }, secret, (err, token) => {
        if (err) {
          console.log(err);
          res.sendStatus(500);
        } else {
          res.status(201).cookie("token", token).send();
        }
      });
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  if (user.username) {
    const passwordValid = bcrypt.compareSync(password, user.password);
    if (passwordValid) {
      jwt.sign({ id: user._id }, secret, (err, token) => {
        return res.cookie("token", token).send();
      });
    } else {
      res.sendStatus(401).json("Invalid username or password");
    }
  } else {
    res.sendStatus(401).json("Username does not exist");
  }
});

app.get("/user", async (req, res) => {
  const token = req.cookies.token;
  try {
    const user = await getUserFromToken(token);
    return res.json({ username: user.username });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

app.post("/logout", (req, res) => {
  return res.cookie("token", "").send();
});

app.get("/posts", async (req, res) => {
  const query = req.query.search;
  const subreddit = req.query.subreddit;
  let searchFilter = query
    ? { body: { $regex: ".*" + query + ".*" } }
    : { rootId: null };
  if (subreddit) {
    searchFilter.subreddit = subreddit;
  }
  try {
    const posts = await Post.find(searchFilter).sort({ postedAt: -1 });
    return res.json(posts);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
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
app.post("/posts", async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const user = await getUserFromToken(token);

    const { title, body, commentParentId, postId, subreddit } = req.body;
    const post = new Post({
      title: title,
      body: body,
      author: user.username,
      postedAt: new Date(),
      commentParentId: commentParentId,
      postId: postId,
      subreddit: subreddit,
    });
    const savedPost = await post.save();
    console.info("saved post : " + savedPost);
    return res.json(savedPost);
  } catch (error) {
    console.log(error);
    return res.sendStatus(401);
  }
});

app.get("/posts/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.json(post);
});

app.get("/comments/root/:id", async (req, res) => {
  const post = await Post.find({ postId: req.params.id }).sort({
    postedAt: -1,
  });
  res.json(post);
});

app.listen(5000);
