import {Link} from "react-router-dom";
import timeSince from "./utils/timeSince";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import Vote from "./Vote";
import { useContext,useEffect  } from "react";
import UserContext from "./context/UserContext";
import axios from "axios";
import RootCommentContext from "./context/RootCommentContext";
const Post = (props) => {

  const [votes, setVotes] = useState([]);
  const [userVotes, setUserVotes] = useState({});
  const userContext = useContext(UserContext);

  const refreshVotes = async () => {
    const commentsIds = [props.postId || props._id];
    const response = await axios.post(
      "http://localhost:5000/vote/count",
      { commentsIds },{withCredentials: true}
     );
    setVotes(response.data.commentsTotals);
    setUserVotes(response.data.userVotes);
  
  };
  useEffect(() => {
    if (userContext.username) {
      refreshVotes()
    };
  }, []);
  



  return (
    <RootCommentContext.Provider
    value={{
      refreshVotes: refreshVotes,
      votes: votes,
      userVotes: userVotes,
    }}
  >
    <div className=" px-5 text-reddit_text mt-6  bg-reddit_dark-bright block border border-black hover:border-reddit_text text-reddit_text">

      <Link to={"/posts/"+(props.subreddit)+"/" +(props.postId || props._id)} className="  mt-6 cursor-pointer">
        <h4 className="text-reddit_text-darker mb-1 pl-2">
          Posted by {props.author} {timeSince(props.postedAt) }
        </h4>

        <div className=" border-reddit_dark  p-2">
          <h2 className="text-2xl mb-3">{props.title}</h2>
          <div className="leading-5 text-sm">
          <ReactMarkdown className="pl-2" remarkPlugins={[gfm]} children={props.body}></ReactMarkdown>
          </div>
        </div>
        </Link>
        {userContext.username && <Vote id={props.postId || props._id}></Vote>}



    </div>
    </RootCommentContext.Provider>
  );
};

export default Post;
