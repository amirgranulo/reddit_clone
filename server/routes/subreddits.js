import express  from "express";
import Subreddit from "../models/Subreddit.js";
import {getUserFromToken} from "../utils/UserUtils.js"

const router = express.Router();

router.post('/subreddits',async (req,res) => {
    const {title,description,profilePictureUrl,coverPictureUrl} = req.body;
    const subredditExists = await Subreddit.exists({title});
    if (subredditExists) {
        return res.send("Subreddit already exists");
    }
    const user = await getUserFromToken(req.cookies.token);
    const {username} = user;
    const createdSubreddit = new Subreddit({title,description,profilePictureUrl,coverPictureUrl,author : username});
    try {

        const savedSubreddit = await createdSubreddit.save();
        return res.status(201).json("");
    }
    catch (error) {
        console.log(error);
        return res.status(500);
    }
    
});

router.get('/subreddits/:title',async (req,res) => {
    const title = req.params.title;
    const subreddit = await Subreddit.findOne({title});
    return res.json(subreddit);
})

export default router; 