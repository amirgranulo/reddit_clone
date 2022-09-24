import express from "express";
import Post from "./models/Post.js";
import { getUserFromToken } from "./utils/UserUtils.js";

const router = express.Router();

router.get("/posts", async (req, res) => {
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

router.post("/posts", async (req, res) => {
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

router.get("/posts/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.json(post);
});

router.get("/comments/root/:id", async (req, res) => {
  const post = await Post.find({ postId: req.params.id }).sort({
    postedAt: -1,
  });
  res.json(post);
});

export default router;
