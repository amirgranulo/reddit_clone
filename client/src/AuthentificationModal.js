import { useState ,useContext} from "react";
import axios from "axios";

import Button from "./UI/Button";
import UserInput from "./UI/UserInput";
import AuthModalContext from "./AuthModalContext";

const AuthentificationModal = (props) => {
  const [modalType, setModalType] = useState("login");

  const setModalTypeToRegister = () => {
    setModalType("register");
  };

  const setModalTypeToLogin = () => {
    setModalType("login");
  };

  const modalTitleText = modalType === "login" ? "Login" : "Register";

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const context = useContext(AuthModalContext);
  const visibleModal = context.visible ? "block" : "hidden";

  const handleEmailOnChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUsernameOnChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordOnChange = (e) => {
    setPassword(e.target.value);
  };

  const registerButtonHandler = (e) => {
    e.preventDefault();
    const userData = {username,email,password};
    axios.post("http://localhost:5000/register",userData,{withCredentials: true});

    
  };

  const loginButtonHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div

      className={"w-screen h-screen fixed top-0 left-0 z-20 flex " + visibleModal}
      style={{ backgroundColor: "rgba(0,0,0,0.8" }}
    >
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
    </div>
  );
};

export default AuthentificationModal;
