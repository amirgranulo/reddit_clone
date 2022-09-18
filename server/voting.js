import express from 'express';
import {getUserFromToken} from "./utils/UserUtils.js"
import Vote from './models/Vote.js';
const router = express.Router();

router.get('/vote/:id/:type', async (req,res) => {
  const response = await getUserFromToken(req.cookies.token);
  const {username} = response;

  const undoVote = await Vote.remove({postId : req.params.id, username : username});
  if (['UP','DOWN'].indexOf(req.params.type) === -1) { // -1 znaci nije prisutan
    return res.json(true);
  }
  const voteNumber = req.params.type === "UP" ? 1 : -1;
  const vote = new Vote({username : username, type : voteNumber, postId : req.params.id});
  try { 
    await vote.save();
    return res.json(true);

  }
  catch (error) {
    console.log(error); 
    return res.json("fail");
  }
});

router.post('/vote/count', async (req,res) => {
    const {commentsIds} = req.body;
    try {
     const user = await getUserFromToken(req.cookies.token);
  
    let userVotes = {};

    const result = await Vote.find({postId : {'$in' : commentsIds}});
    let commentsTotals = {};
    result.forEach(vote => {
        if (typeof commentsTotals[vote.postId] === 'undefined') {
            commentsTotals[vote.postId] = 0;
        }
        if (vote.username === user.username) {
            userVotes[vote.postId] = vote.type;
        }
        commentsTotals[vote.postId] += vote.type;
    })
    
    return res.json({commentsTotals,userVotes});

    }
    catch (error) {
        console.log(error)
        return res.json("error");
    }
})



export default router;