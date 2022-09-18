import { useContext } from "react";
import SubredditContext from "./context/SubredditContext";

function SubRedditHeader() {
    const context = useContext(SubredditContext);
    if (!context.title) {
      return;
    }
    return (
      <>
        <div className="h-20 bg-cover" style={{backgroundImage:`url("${context.subredditInfo.coverPictureUrl}")`}}>
        </div>
        <div className="bg-reddit_dark-bright">
          <div className="mx-6 relative flex">
            <div className="h-20 w-20 rounded-full overflow-hidden relative -top-3 border-4 border-white bg-white">
              <img className={"object-cover h-full "}  src={context.subredditInfo.profilePictureUrl} alt="" />
            </div>
            <div className="pt-2 pl-4">
              <h1 className="text-gray-300 text-3xl">{context.subredditInfo.title}: {context.subredditInfo.description}</h1>
              <h5 className="text-gray-500">/{ context.subredditInfo.title}</h5>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  export  default SubRedditHeader;