import { useState,useEffect } from "react";
import axios from "axios";
import Post from "./Post";
import CommentForm from "./CommentForm";
import Comments from "./Comments.js";
import RootCommentContext from "./context/RootCommentContext";

const PostPage = (props) => {
    const [post,setPost] = useState({});
    const postId = props.match.params.id;
    const [comments,setComments] = useState([]);  

    const refreshComments = async () => {
        const response = await axios.get("http://localhost:5000/comments/root/" + postId)
        setComments(response.data)
    }   
    useEffect(() => {
        const fetchPost = async () => {
            const response = await axios.get("http://localhost:5000/posts/" + postId)
            setPost(response.data)
        }
  
        fetchPost();
        refreshComments();
    },[postId])
    // !! cast u boolean tip
    return <div>
        {post  && <Post {...post}/>}
        {!!post &&  !!post._id && <> 
        <hr className="border-reddit-dark_bright m-5 mt-0"></hr>
        <CommentForm onSubmit={refreshComments} showAuthor={true} postId={post._id} commentParentId={post._id} />
        <hr className="border-reddit-dark_bright m-5 mt-0" ></hr>
        <RootCommentContext.Provider value={{refreshComments: refreshComments }}>

        <Comments  commentParentId={post._id} comments={comments}/> 
        </RootCommentContext.Provider>

        </>}
    </div>
}

export default PostPage;