import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Post from "./Post";
import CommentForm from "./CommentForm";
import Comments from "./Comments.js";
import RootCommentContext from "./context/RootCommentContext";
import UserContext from "./context/UserContext";
import AuthModalContext from "./context/AuthModalContext";
const PostPage = (props) => {
  const [post, setPost] = useState({});
  const postId = props.match.params.id;
  const [comments, setComments] = useState([]);
  const [votes, setVotes] = useState([]);
  const [userVotes, setUserVotes] = useState({});
  const userContext = useContext(UserContext);
  const authModalContext = useContext(AuthModalContext);
  const refreshComments = async () => {
    const response = await axios.get(
      "http://localhost:5000/comments/root/" + postId
    );
    setComments(response.data);
  };
  const refreshVotes = async () => {
    const commentsIds = [post._id, ...comments.map((comment) => comment._id)];
    console.log("postId" + post._id);
    const response = await axios.post(
      "http://localhost:5000/vote/count",
      { commentsIds },
      { withCredentials: true }
    );
    setVotes(response.data.commentsTotals);
    setUserVotes(response.data.userVotes);
  };

  useEffect(() => {
    if (!userContext.username) {
      authModalContext.setVisible("login");
    }
    const fetchPost = async () => {
      const response = await axios.get("http://localhost:5000/posts/" + postId);
      setPost(response.data);
    };

    if (props.comment) {
      setPost(props.comment);
    } else {
      fetchPost();
    }
    refreshComments();
  }, [postId]);

  useEffect(() => {
    refreshVotes();
  }, [comments.length]);

  // !! cast u boolean tip
  return (
    <div>
      {post && <Post {...post} />}
      {!!post && !!post._id && (
        <>
          <hr className="border-reddit-dark_bright m-5 mt-0"></hr>
          <CommentForm
            onSubmit={refreshComments}
            showAuthor={true}
            postId={post._id}
            commentParentId={post._id}
          />
          <hr className="border-reddit-dark_bright m-5 mt-0"></hr>
          <RootCommentContext.Provider
            value={{
              refreshComments: refreshComments,
              refreshVotes: refreshVotes,
              votes: votes,
              userVotes: userVotes,
            }}
          >
            <Comments
              commentParentId={post._id}
              postId={post._id}
              comments={comments}
            />
          </RootCommentContext.Provider>
        </>
      )}
    </div>
  );
};

export default PostPage;
