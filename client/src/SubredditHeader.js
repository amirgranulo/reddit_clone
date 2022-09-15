import { useContext } from "react";
import SubredditContext from "./context/SubredditContext";

function SubRedditHeader() {
    const context = useContext(SubredditContext);

    // doso do 1:02
    return (
      <>
        <div className="h-20 bg-cover" style={{backgroundImage:'url("https://styles.redditmedia.com/t5_2qs0q/styles/bannerBackgroundImage_7glcgg5ymxp21.png?width=4000&s=9684bc66e812b8730ad694c3f454da8c00a493d7")'}}>
        </div>
        <div className="bg-reddit_dark-bright">
          <div className="mx-6 relative flex">
            <div className="h-20 w-20 rounded-full overflow-hidden relative -top-3 border-4 border-white bg-white">
              <img src="https://styles.redditmedia.com/t5_2qs0q/styles/communityIcon_kxcmzy9bt1381.jpg?width=256&format=pjpg&s=0a2e472f6fae0712fee4a3b5d44920fe35dbcdaa" alt=""/>
            </div>
            <div className="pt-2 pl-4">
              <h1 className="text-gray-300 text-3xl">{context.subredditInfo &&  context.subredditInfo.title}: {context.subredditInfo && context.subredditInfo.description}</h1>
              <h5 className="text-gray-500">/{context.subredditInfo && context.title.toLowerCase()}</h5>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  export  default SubRedditHeader;