import { useState, useContext } from "react";
import AuthModalContext from "./context/AuthModalContext";
import Logo from "./logo.png";
import Avatar from "./reddit_avatar.png";
import ClickOutHandler from "react-clickout-handler";
import {
  SearchIcon,
  BellIcon,
  ChatIcon,
  PlusIcon,
  ChevronDownIcon,
  UserIcon,
  LoginIcon,
  LogoutIcon,
} from "@heroicons/react/solid";

import Button from "./UI/Button";
import UserContext from "./context/UserContext";
import { Link } from "react-router-dom";
import RedirectContext from "./context/RedirectContext";
const Header = () => {
  const [userDropdownVisibility, setUserDropdownVisibility] =
    useState("hidden");
  const handleUserDropdown = () => {
    if (userDropdownVisibility === "hidden") {
      setUserDropdownVisibility("block");
    } else {
      setUserDropdownVisibility("hidden");
    }
  };

  const [searchInput,setSearchInput] = useState("");
  const handleSearchInputOnChange = (event) => {
    setSearchInput(event.target.value);
  }

  const handleClickout = () => {
    setUserDropdownVisibility("hidden");
  };
  const authModalContext = useContext(AuthModalContext);
  const userContext = useContext(UserContext);
  const redirectContext = useContext(RedirectContext);

  const handleLoginButtonClick = () => {
    authModalContext.setVisible("login");
  };
  const handleRegisterButtonClick = () => {
    authModalContext.setVisible("register");
  };
  const handleLogoutButtonClick = () => {
    userContext.logout();
  }

  const search = (event) => {
    event.preventDefault();
    redirectContext.setRedirect('/search/'+ encodeURIComponent(searchInput));
  }

  return (
    <header className="w-full bg-reddit_dark p-2">
      <div className="mx-4 flex">
        <Link to="/">

        <img src={Logo} alt="Reddit logo" className="w-8 h-8 mr-4 mt-2"></img>
        </Link>

        <form
          onSubmit={search}
          className=" p-1 px-4 flex rounded-md border-gray-600 bg-reddit_dark-bright mx-4 flex-grow"
        >
          <SearchIcon className="text-gray-500 h-7 w-7 mt-2" />
          <input
            type="text"
            className="bg-reddit_dark-bright h-6 m-2 text-sm p-1 pl-2 pr-0 block focus:outline-none text-white"
            placeholder="Search"
            value={searchInput}
            onChange={handleSearchInputOnChange}
          ></input>
        </form>

        {userContext.username && (
          <>
            <button className="px-3 py-1">
              <ChatIcon className="text-white w-8 h-8 m-1 mx-2" />
            </button>
            <button className="px-3 py-1">
              <BellIcon className="text-white w-8 h-8 m-1 mx-2" />
            </button>
            <button className="px-3 py-1">
              <PlusIcon className="text-white w-8 h-8 m-1 mx-2" />
            </button>
          </>
        )}
        {!userContext.username && (
          <div className="mx-1 hidden sm:block">
            <Button
              outline="true"
              className=""
              onClick={handleLoginButtonClick}
            >
              Login
            </Button>
            <Button onClick={handleRegisterButtonClick} className="">
              Register
            </Button>
          </div>
        )}
          <ClickOutHandler onClickOut={handleClickout}>

        <button
          className="rounded-md flex ml-4 mt-1 border border-gray-700"
          onClick={handleUserDropdown}
        >
          {!userContext.username && (
            <UserIcon className="w-8 h-8 mt-1 text-gray-300"></UserIcon>
          )}

          {userContext.username && (
            <div className="bg-reddit_dark-bright rounded-md">
              <img src={Avatar} alt="Reddit avatar" className="block w-8 h-8" />{" "}
            </div>
          )}

          <ChevronDownIcon className="text-gray-500 w-6 h-6 mt-1 m-1" />
        </button>
        <div
          className={
            "absolute text-center right-5 top-16 bg-reddit_dark border border-gray-700 z-5 rounded-md text-reddit_text overflow-hidden " +
            userDropdownVisibility
          }
        >
          {userContext.username && <span className="block w-50 py-2 px-3 text-sm">{userContext.username}</span>}
          {!userContext.username ? (
            <button
              onClick={handleLoginButtonClick}
              href=""
              className="block flex w-50 py-2 px-3 hover:bg-gray-300 hover:text-black "
            >
              <LoginIcon className="w-6 h-5 mr-2" />
              Login / Register
            </button>
          ) :    <button
          onClick={handleLogoutButtonClick}
          href=""
          className="block flex w-50 py-2 px-3 hover:bg-gray-300 hover:text-black text-sm"
        >
          <LogoutIcon className="w-6 h-5 mr-2" />
          Log out
        </button>}

        </div>
      </ClickOutHandler>
      </div>
    </header>
  );
};

export default Header;
