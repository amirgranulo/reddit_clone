import "./style.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { createBrowserHistory } from "history";
import Header from "./Header.js";
import AuthentificationModal from "./AuthentificationModal";
import AuthModalContext from "./context/AuthModalContext";
import UserContext from "./context/UserContext";
import {
  Switch,
  Route,
  Router,
  BrowserRouter,
  
} from "react-router-dom";
import SubReddit from "./SubReddit";
import PostPage from "./PostPage";
function App() {
  const newHistory = createBrowserHistory();
  const [user, setUser] = useState({});
  const [showAuthentificationModal, setShowAuthentificationModal] =
    useState(false);
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
    axios.post("http://localhost:5000/logout", { withCredentials: true });
    setUser({});
  };

  return (
    <AuthModalContext.Provider
      value={{
        visible: showAuthentificationModal,
        setVisible: setShowAuthentificationModal,
      }}
    >
      <UserContext.Provider value={{ ...user, setUser, logout }}>

          <Router history={newHistory}>
          <Header />

            <Switch>
              <Route exact path="/" component={SubReddit}></Route>
              <Route exact path="/comments/:id" component={PostPage}></Route>
            </Switch>
          </Router>
        <AuthentificationModal />
      </UserContext.Provider>
    </AuthModalContext.Provider>
  );
}

export default App;
