import React from "react";
import { useState,useEffect } from "react";
import Post from "./Post";
import axios from "axios";
const PostsList = (props) => {
    const [posts,setPosts] = useState([]);

    useEffect(() => {
 
        const fetchPosts = async () => {
          const response = await axios.get("http://localhost:5000/posts", {
            
          });
          setPosts(response.data);
        };
        fetchPosts().catch(console.error);
      }, []);

  return (
    <div>
      {posts.length > 0 &&
        posts.map((post) => {
          return <Post {...post} />;
        })}
      <Post />
    </div>
  );
};

export default PostsList;
