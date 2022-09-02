import "./style.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header.js";
import AuthentificationModal from "./AuthentificationModal";
import AuthModalContext from "./context/AuthModalContext";
import UserContext from "./context/UserContext";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import SubReddit from "./SubReddit";
import PostPage from "./PostPage";
import PostFormModal from "./PostFormModal";
import NewPostModalContext from "./context/NewPostModalContext";

function App() {
  const [user, setUser] = useState({});
  const [showAuthentificationModal, setShowAuthentificationModal] =
    useState(false);
  const [showNewPostModal,setShowNewPostModal] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get("http://localhost:5000/user", {
        withCredentials: true,
      });
      setUser(response.data);
    };

    fetchUser().catch(console.error);
  }, []);

  const logout = () => {
    axios
      .post("http://localhost:5000/logout", { withCredentials: true })
      .then(() => {
        setUser({});
      });
  };

  return (
    <AuthModalContext.Provider
      value={{
        visible: showAuthentificationModal,
        setVisible: setShowAuthentificationModal,
      }}
    >
      <UserContext.Provider value={{ ...user, setUser, logout }}>
        <NewPostModalContext.Provider value={{
          visible : showNewPostModal,
          setVisible : setShowNewPostModal
        }}>

       
        <BrowserRouter>
          <Header />

          <Switch>
            <Route exact path="/" component={SubReddit}></Route>
            <Route exact path="/comments/:id" component={PostPage}></Route>
          </Switch>
        </BrowserRouter>
        <AuthentificationModal />
        <PostFormModal/>
        </NewPostModalContext.Provider>
      </UserContext.Provider>
    </AuthModalContext.Provider>
  );
}

export default App;
