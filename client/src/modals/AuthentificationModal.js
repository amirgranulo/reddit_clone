import { useState, useContext } from "react";
import axios from "axios";

import Button from "../UI/Button";
import UserInput from "../UI/UserInput";
import AuthModalContext from "../context/AuthModalContext";
import ClickOutHandler from "react-clickout-handler";
import UserContext from "../context/UserContext";

const AuthentificationModal = (props) => {
  const userContext = useContext(UserContext);
  const [modalType, setModalType] = useState("login");

  const setModalTypeToRegister = () => {
    authModalContext.setVisible("register");
  };

  const setModalTypeToLogin = () => {
    authModalContext.setVisible("login");
  };
  const modalTitleText = modalType === "login" ? "Login" : "Register";

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wrongCredentials,setWrongCredentials] = useState();
  const authModalContext = useContext(AuthModalContext);
  const visibleModal = authModalContext.visible !== false ? "block" : "hidden";
  if (authModalContext.visible && authModalContext.visible !== modalType) {
    setModalType(authModalContext.visible);
  }

  const handleEmailOnChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUsernameOnChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordOnChange = (e) => {
    setPassword(e.target.value);
  };

  const registerButtonHandler = async (e) => {
    e.preventDefault();
    const userData = { username, email, password };
    await axios.post("http://localhost:5000/register", userData, {
      withCredentials: true,
    });
    userContext.setUser({ username });
    authModalContext.setVisible(false);
    setEmail("");
    setPassword("");
    setUsername("");
  };

  const loginButtonHandler = async (e) => {
    e.preventDefault();
    const userData = { username, password };
    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        userData,
        { withCredentials: true }
      );
      if (response.status === 200) {
        userContext.setUser({ username });
        authModalContext.setVisible(false);
        setWrongCredentials();
      }
    } catch (error) {
      setWrongCredentials("Wrong username or password.");
    }
  };

  const handleClickout = () => {
    authModalContext.setVisible(false);
  };

  return (
    <div
      className={
        "w-screen h-screen fixed top-0 left-0 z-30 flex " + visibleModal
      }
      style={{ backgroundColor: "rgba(0,0,0,0.8" }}
    >
      <ClickOutHandler onClickOut={handleClickout}>
        <div
          className="w-3/4 sm:w-1/2 md:w-1/4 border border-gray-700 bg-reddit_dark p-5 
      text-reddit_text mx-auto self-center rounded-md"
        >
          <h1 className="text-2xl mb-3">{modalTitleText}</h1>

          <label>
            <span className="text-gray-600 text-sm  ">username:</span>
            <UserInput
              type="text"
              className="mb-2 w-full"
              value={username}
              onChange={handleUsernameOnChange}
            />
          </label>
          {modalType === "register" && (
            <label>
              <span className="text-gray-600 text-sm">email:</span>
              <UserInput
                type="text"
                className="mb-2 w-full"
                value={email}
                onChange={handleEmailOnChange}
              />
            </label>
          )}
          <label>
            <span className="text-gray-600 text-sm">password:</span>
            <UserInput
              type="password"
              value={password}
              onChange={handlePasswordOnChange}
              className="mb-2 w-full"
            />
          </label>
          {wrongCredentials && <h2 className="text-center text-white-600">{wrongCredentials}</h2>}

          {modalType === "register" && (
            <Button
              onClick={registerButtonHandler}
              outline="true"
              className="w-full self-center mb-3 "
            >
              Register
            </Button>
          )}
          {modalType === "login" && (
            <Button
              onClick={loginButtonHandler}
              outline="true"
              className="w-full self-center mb-3 "
            >
              Log In
            </Button>
          )}
          {modalType === "login" ? (
            <div className=" text-center">
              New to Reddit?
              <button
                className="ml-2 text-blue-600"
                onClick={setModalTypeToRegister}
              >
                REGISTER
              </button>
            </div>
          ) : (
            <div className=" text-center">
              Already have an account?
              <button
                className="ml-2 text-blue-600"
                onClick={setModalTypeToLogin}
              >
                LOG IN
              </button>
            </div>
          )}
        </div>
      </ClickOutHandler>
    </div>
  );
};

export default AuthentificationModal;
