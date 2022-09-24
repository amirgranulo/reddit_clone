import PostsList from "./posts/PostsList";
import SubRedditHeader from "./SubredditHeader";
import PostForm from "./posts/PostForm";
import SubredditContext from "./context/SubredditContext";

import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
const SubReddit = () => {

  const {subreddit} = useParams();
  const context = useContext(SubredditContext);

  useEffect(() => {
  
    context.setTitle(subreddit)
    
  },[subreddit])
  return <>
    <SubRedditHeader />
    {subreddit && <PostForm />}
    <PostsList></PostsList>
  </>;
};

export default SubReddit;
