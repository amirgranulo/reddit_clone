import React from "react";
import { useState,useEffect } from "react";
import Post from "./Post";
import axios from "axios";

const SearchResults = (props) => {
  const { query } = props.match.params;
  const [posts, setPosts] = useState([]);
    // STAVIT I DA SEARCHA U NASLOVU 
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(
        "http://localhost:5000/posts?search=" + query,
        { withCredentials: true }
      );
      setPosts(response.data);
    };
    fetchPosts().catch(console.error);
  }, [query]);

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

export default SearchResults;
