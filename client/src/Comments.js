import { useState, useContext } from "react";

import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

import timeSince from "./utils/timeSince";

import Button from "./UI/Button";
import CommentForm from "./CommentForm";
import RootCommentContext from "./context/RootCommentContext";
import Vote from "./Vote";
const Comments = (props) => {
  const [showCommentForm, setShowCommentForm] = useState(false);
  const comments = props.comments.filter(
    (comment) => props.commentParentId === comment.commentParentId
  );
  const rootCommentInfo = useContext(RootCommentContext);

  return (
    <div className={"ml-5 mt-2 mb-2"}>
      {comments.map((comment) => {  
        const replies = props.comments.filter(c => c.commentParentId === comment._id);
        return (
          <div className="text-reddit_text">
            <div className="flex mb-1 ">
              <div
                className={"bg-reddit_text w-10 h-10 rounded-full mr-2"}
              ></div>
              <div className="py-1 px-1 text-sm"> {comment.author}</div>
              <div className="text-sm py-1 px-2">
                {timeSince(comment.postedAt)}
              </div>
            </div>
            <div className="text-lg border-l-2  border-reddit_text-darker p-3 ml-5 mb-2 pb-0 pl-5">
              <ReactMarkdown className="pl-2" remarkPlugins={[gfm]} children={comment.body}></ReactMarkdown>
              <Vote id={comment._id}/>
              <Button 
                  onClick={() => {
                    setShowCommentForm(comment._id);
                  }}
                  outline="true"
                >
                  Reply
                </Button>
              <div>
     
                {comment._id === showCommentForm && (
                  <CommentForm
                    commentParentId={comment._id} postId={props.postId}
                    showAuthor={false}
                    onSubmit={() => {setShowCommentForm(false); rootCommentInfo.refreshComments(); }}
                    onCancel={() => {
                      setShowCommentForm(false);
                    }}
                  />
                )}
                { replies.length >0 &&  <Comments comments={props.comments} postId={props.postId} commentParentId={comment._id}/> }
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
