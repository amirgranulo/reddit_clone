import axios from "axios";
import { useContext, useState } from "react";
import AuthModalContext from "../context/AuthModalContext";
import UserContext from "../context/UserContext";
import Button from "../UI/Button";
import TextArea from "../UI/TextArea";

const CommentForm = (props) => {
  const user = useContext(UserContext);
  const [comment, setComment] = useState();

  const handleCommentOnChange = (event) => {
    setComment(event.target.value);
  };
  const authModalContext = useContext(AuthModalContext);
  const postComment = async (event) => {
    if (!user.username) {
      authModalContext.setVisible("login");
    }
    event.preventDefault();
    console.info(window.location.pathname)
    const url = window.location.pathname
    const prefix = "/posts/";
    const subreddit = url.substring(url.indexOf(prefix+prefix.length),url.lastIndexOf("/")).split(prefix)[1].replaceAll("%"," ");
    const data = {
      body: comment,
      commentParentId: props.commentParentId,
      postId: props.postId,
      subreddit: subreddit,
    };
    const response = await axios.post("http:///localhost:5000/posts", data, {
      withCredentials: true,
    });
    setComment("");
    if (props.onSubmit) {
      props.onSubmit();
    }
  };

  return (
    <div className="flex flex-row justify-left mt-5 mb-2">
      <div className="text-white px-5 w-1/2">
        {user.username && props.showAuthor && (
          <div> Comment as {user.username} </div>
        )}
        <form className="w-full" onSubmit={postComment}>
          <TextArea
            onChange={handleCommentOnChange}
            value={comment}
            className="w-full"
            placeholder={"Enter your comment.You can use markdown."}
          />

          <div className="text-right">
            {!!props.onCancel && (
              <Button
                outline
                onClick={props.onCancel}
                className="text-right mt-5 mb-5"
              >
                Cancel
              </Button>
            )}
            <Button className="text-right mt-5 mb-5">Comment</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentForm;
