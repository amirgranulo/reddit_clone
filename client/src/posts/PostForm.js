import Avatar from "../reddit_avatar.png";
import { useContext } from "react";
import NewPostModalContext from "../context/NewPostModalContext";
const PostForm = () => {

  const modalContext = useContext(NewPostModalContext);

  const showModal = (event) => {
    event.preventDefault();
    modalContext.setVisible(true);
  } 

  return (
    <div className="bg-reddit_dark px-6 py-4 text-gray-400">
      <div className="border border-reddit_dark p-2 rounded-md flex">
        <div className="rounded-full bg-gray-600 mr-2 w-8 h-8">
          <img src={Avatar} className="h-8 w-8" alt="" />
        </div>
        <form action="">
          <input
            type="text"
            className="bg-reddit_dark-bright border-reddit_dark-bright p-2 block rounded-md dflex-grow"
            placeholder="New post"
            onFocus={showModal}
          ></input>
        </form>
      </div>
    </div>
  );
};
export default PostForm;