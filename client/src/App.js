import "./style.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header.js";
import AuthentificationModal from "./AuthentificationModal";
import AuthModalContext from "./context/AuthModalContext";
import UserContext from "./context/UserContext";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import SubReddit from "./SubReddit";
import PostPage from "./PostPage";
import PostFormModal from "./PostFormModal";
import NewPostModalContext from "./context/NewPostModalContext";
import RedirectContext from "./context/RedirectContext";
import SearchResults from "./SearchResults";

function App() {
  const [user, setUser] = useState({});
  const [showAuthentificationModal, setShowAuthentificationModal] =
    useState(false);
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [redirect, setRedirect] = useState(false);
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

  useEffect(() => {
    if (redirect) {
      setRedirect(false);
    }
  },[redirect])

  return (
    <AuthModalContext.Provider
      value={{
        visible: showAuthentificationModal,
        setVisible: setShowAuthentificationModal,
      }}
    >
      <UserContext.Provider value={{ ...user, setUser, logout }}>
        <NewPostModalContext.Provider
          value={{
            visible: showNewPostModal,
            setVisible: setShowNewPostModal,
          }}
        >
          <RedirectContext.Provider value={{ redirect, setRedirect }}>
            <BrowserRouter>
              <Header />
              {redirect && <Redirect to={redirect}></Redirect>}
              <Switch>
                <Route exact path="/" component={SubReddit}></Route>
                <Route exact path="/posts/:id" component={PostPage}></Route>
                <Route exact path="/search/:query" component={SearchResults}></Route>
              </Switch>
              <AuthentificationModal />
              <PostFormModal />
            </BrowserRouter>
          </RedirectContext.Provider>
        </NewPostModalContext.Provider>
      </UserContext.Provider>
    </AuthModalContext.Provider>
  );
}

export default App;
