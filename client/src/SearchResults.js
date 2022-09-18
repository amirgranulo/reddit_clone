import React from "react";
import { useState, useEffect } from "react";
import Post from "./Post";
import axios from "axios";
import { Link } from "react-router-dom";
const SearchResults = (props) => {
  const { query } = props.match.params;
  const [posts, setPosts] = useState([]);
  const [subreddits, setSubreddits] = useState([]);
  // STAVIT I DA SEARCHA U NASLOVU
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get("/search?query=" + query, {
        withCredentials: true,
      });
      setPosts(response.data.posts);
      setSubreddits(response.data.subreddits);
    };
    fetchPosts().catch(console.error);
  }, [query]);

  return (
    <div>
      {subreddits.map((subreddit) => {
        console.info(subreddit)
       return  <div className={"px-5"}><Link
          className={
            "px-2 py-7 bg-reddit_dark-bright block border border-black hover:border-reddit_text text-reddit_text  mt-6 cursor-pointer"
          }
          to={"/r/" + subreddit.title}
        >
          <h1 className="text-2xl mb-3">r/{subreddit.title}</h1>
        </Link></div>;
      })}
      {posts.length > 0 &&
        posts.map((post) => {
          return <Post {...post} />;
        })}
      <Post />
    </div>
  );
};

export default SearchResults;
