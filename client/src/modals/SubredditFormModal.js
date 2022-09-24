import { useContext, useState } from "react";
import SubredditContext from "../context/SubredditContext";
import RedirectContext from "../context/RedirectContext";
import ClickOutHandler from "react-clickout-handler";
import UserInput from "../UI/UserInput";
import Button from "../UI/Button";
import axios from "axios";

const SubRedditFormModal = () => {
  const context = useContext(SubredditContext);
  const redirectContext = useContext(RedirectContext);
  const handleClickout = () => {
    context.setVisible(false);
  };
  const visibleModal = context.visible ? "block" : "hidden";

  const [title, setTitle] = useState("");

  const handleTitleOnChange = (event) => {
    setTitle(event.target.value);
  };
  const [description, setDescription] = useState("");

  const handleDescriptionOnChange = (event) => {
    setDescription(event.target.value);
  };

  const [profilePictureUrl, setProfilePictureUrl] = useState("");

  const handleProfilePictureUrlOnChange = (event) => {
    setProfilePictureUrl(event.target.value);
  };
  const [coverPictureUrl, setCoverPictureUrl] = useState("");

  const handleCoverPictureurlOnChange = (event) => {
    setCoverPictureUrl(event.target.value);
  };
  const handleCancelButton = () => {
    context.setVisible(false);
  }

  if (!context.visible) {
    return null;
  }

  const createSubreddit =  async () => {
    const data = {title,description,profilePictureUrl,coverPictureUrl}
    const response = await axios.post("/subreddits",data,{withCredentials: true});
    context.setVisible(false);
    redirectContext.setRedirect("/r/"+ title);
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
          <h1 className="text-2l mb-5">Create a subreddit</h1>
          <UserInput
            className={"w-full mb-2"}
            placeholder={"Subreddit"}
            value={title}
            onChange={handleTitleOnChange}
          />
           <UserInput
            className={"w-full mb-2"}
            placeholder={"Description"}
            value={description}
            onChange={handleDescriptionOnChange}
          />
           <UserInput
            className={"w-full mb-2"}
            placeholder={"Profile picture URL"}
            value={profilePictureUrl}
            onChange={handleProfilePictureUrlOnChange}
          />
           <UserInput
            className={"w-full mb-2"}
            placeholder={"Cover picture URL"}
            value={coverPictureUrl}
            onChange={handleCoverPictureurlOnChange}
          />
          <div className={"text-right px-4 py-2"}>
          <Button onClick={handleCancelButton} className={"mr-3"} outline="true">
            CANCEL
            </Button>
            <Button onClick={createSubreddit} className={'px-4 py-2'}>Create your subreddit</Button>
            </div>

        </div>
      </ClickOutHandler>
    </div>
  );
};

export default SubRedditFormModal;
