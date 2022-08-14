import "./style.css";

import Header from "./Header.js";
import SubRedditHeader from "./SubredditHeader";
import PostForm from "./PostForm";

function App() {
  return (
    <div>
      <Header />
      <SubRedditHeader />
      <PostForm/>
      <div className="px-6 bg-reddit_dark text-reddit_text ">
        <h4 className="text-reddit_text-darker mb-1">Posted by /ashapanjo 5 hours ago</h4>
        <div className=" border-reddit-dark bg-reddit_dark-bright p-2">
          <h2 className="text-2xl mb-3">Lorem ipsum bla bla bla bla bla</h2>
          <div className="leading-5">
            <p>
            AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
            heeeeeeeeeeeeeeeeeeeeeeeeee
            ffffffffffffffffffffffffffffffffffffffffff
            sssssssssssssssssssssssssssss
            </p>
      
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
