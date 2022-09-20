import React, { useContext } from "react";
import { useState,useEffect } from "react";
import Post from "./Post";
import axios from "axios";
import SubredditContext from "./context/SubredditContext";

const PostsList = (props) => {
    const [posts,setPosts] = useState([]);
  
    let url = "http://localhost:5000/posts"; 
    const subredditContext = useContext(SubredditContext);

    useEffect(() => {

        const fetchPosts = async () => {
          if (subredditContext.subredditInfo) {
            url += "?subreddit=" + subredditContext.subredditInfo.title;
          }
      
          const response = await axios.get(url , {
            
          });
          const posts = response.data.filter(post => post.title);
          setPosts(posts);
        };
        fetchPosts().catch(console.error);
      }, [subredditContext]);

  return (
    <div>
      {posts.length > 0 &&
        posts.map((post) => {
          return <Post subreddit={subredditContext.subredditInfo.title} {...post} />;
        })}
    </div>
  );
};

export default PostsList;
