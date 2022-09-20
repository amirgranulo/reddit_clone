import axios from "axios";
import { useContext, useEffect } from "react";
import RootCommentContext from "./context/RootCommentContext";
import UserContext from "./context/UserContext";
const Vote = (props) => {
  const context = useContext(RootCommentContext);
  const userContext = useContext(UserContext);
  const vote = async (voteType) => {
    const voteTypeNumber = voteType === "UP" ? 1 : -1;
    if (voteTypeNumber === userVote) {
      voteType = "undo";
    } 
    const url = "http://localhost:5000/vote/" + props.id + "/" + voteType;
    const response = await axios.get(url, { withCredentials: userContext.username ? true : false });
    context.refreshVotes();
  };
  const handleUpVote = () => {
    vote("UP");
  };

  const handleDownVote = () => {
    vote("DOWN");
  };

  useEffect(() => {
     context.refreshVotes();
  })
  const totalUpvotes = context.votes[props.id] || 0;
  const userVote = context.userVotes[props.id] || null;

  const arrowButton = (type = "UP") => {

    let className = "inline-block h-4 text-reddit_text-darker hover:text-white relative top-1 ";
    const typeNumber = type === "UP" ? 1 : -1;
    if (typeNumber === userVote) {
      className += " text-reddit_orange";
    }
    else {
      className += "text-reddit_text-darker hover:text-white"
    }
    if (type === "UP") {
      return (
        <button
          onClick={handleUpVote}
          className={className}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
            />
          </svg>
        </button>
      );
    }
    else {
      return (
        <button
        onClick={handleDownVote}
        className={className}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
          />
        </svg>
      </button>
      )
    }
  };

  return (
    <div className={"inline-block ml-1.5"}>
      {arrowButton("UP")}
      <div className={"inline-block mx-1 text-white"}>{totalUpvotes}</div>
      {arrowButton("DOWN")}
    </div>
  );
};

export default Vote;
