import { useState,useEffect } from "react";
import axios from "axios";
import Post from "./Post";

const PostPage = (props) => {
    const [post,setPost] = useState({});
    const postId = props.match.params.id;

    useEffect(() => {
        const fetchPost = async () => {
            const response = await axios.get("http://localhost:5000/posts/" + postId)
            setPost(response.data)
        }
        fetchPost();
    },[])
    return <div>
        {post  && <Post {...post}/>}
    </div>
}

export default PostPage;