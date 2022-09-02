import { useState } from "react";
import { useContext } from "react";
import axios from "axios";
import NewPostModalContext from "./context/NewPostModalContext";
import AuthModalContext from "./context/AuthModalContext";
import ClickOutHandler from "react-clickout-handler";
import UserInput from "./UI/UserInput";
import TextArea from "./UI/TextArea";
import Button from "./UI/Button";

const PostFormModal = () => {
  const handleClickout = () => {};
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  

 const createPost = async () => {
    const requestBody = {title,body}
    try {
    const response = await axios.post("http://localhost:5000/posts", requestBody, {withCredentials: true });
    
    }
    catch(error) {
        console.log(error.response);
        if (error.response.status === 401) {
            authentificationModalContext.setVisible(true);
        }
    }

 }
 
  const modalContext = useContext(NewPostModalContext);
  const visibleModal = modalContext.visible ? "block" : "hidden";

  const authentificationModalContext = useContext(AuthModalContext);


  const handleTitleOnChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBodyOnChange = (event) => {
    setBody(event.target.value);
  };

  const handleCancelButton = () => {
    modalContext.setVisible(false);
  }
 
  return (
    <div
      className={
        "w-screen h-screen fixed top-0 left-0 z-20 flex " + visibleModal
      }
      style={{ backgroundColor: "rgba(0,0,0,0.90" }}
    >
      <ClickOutHandler onClickOut={handleClickout}>
        <div
          className="w-3/4 sm:w-3/4 md:w-2/4 border border-gray-700 bg-reddit_dark p-5 
    text-reddit_text mx-auto self-center rounded-md"
        >
          <h1 className="text-2l mb-5">Create a post</h1>
          <UserInput
            className={"w-full"}
            placeholder={"Title"}
            value={title}
            onChange={handleTitleOnChange}
          />
          <TextArea
            className={"w-full mt-3 mb-3"}
            placeholder={"Text (markdown can be used)"}
            onChange={handleBodyOnChange}
            value={body}
          />

          <div className={"text-right"}>
            <Button onClick={handleCancelButton} className={"mr-3"} outline="true">
            CANCEL
            </Button>
            <Button onClick={createPost} className={"px-4 py-2"} >
              POST
            </Button>
          </div>
        </div>
      </ClickOutHandler>
    </div>
  );
};

export default PostFormModal;
