import "./style.css";
import {useState} from "react";

import Header from "./Header.js";
import SubRedditHeader from "./SubredditHeader";
import PostForm from "./PostForm";
import AuthentificationModal from "./AuthentificationModal";
import AuthModalContext from "./AuthModalContext";
function App() {

  const [showAuthModal,setShowAuthModal] = useState(false);

  // DOSO DO 1:54 , ili preci na Clickout biblioteku kao on ili pasteat kod iz headerea i prilagodit za clickout
  return (
    <AuthModalContext.Provider value={{visible : true}}>
    <div>
      <Header />
      <SubRedditHeader />
      <PostForm/>
      <AuthentificationModal  />
      <div className="px-6 bg-reddit_dark text-reddit_text mb-6">
        <h4 className="text-reddit_text-darker mb-1">Posted by /ashapanjo 5 hours ago</h4>
        <div className=" border-reddit_dark bg-reddit_dark-bright p-2">
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
    </AuthModalContext.Provider>

  );
}

export default App;
