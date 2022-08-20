import { useState, useEffect, useRef } from "react";
import Logo from "./logo.png";
import Avatar from "./reddit_avatar.png";

import {
  SearchIcon,
  BellIcon,
  ChatIcon,
  PlusIcon,
  ChevronDownIcon,
  UserIcon,
  LoginIcon,
} from "@heroicons/react/solid";

import Button from "./UI/Button";

const Header = () => {
  const [userDropdownVisibility, setUserDropdownVisibility] =
    useState("hidden");
  const userDropdownRef = useRef(null);
  const useUserDropdown = (ref) => {
    useEffect(() => {
      const handleClickOutsideButton = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setUserDropdownVisibility("hidden");
        }
      };
      document.addEventListener("mousedown", handleClickOutsideButton);
      return () => {
        document.removeEventListener("mousedown", handleClickOutsideButton);
      };
    },[ref]);
  };
  const handleUserDropdown = () => {
    if (userDropdownVisibility === "hidden") {
      setUserDropdownVisibility("block");
    } else {
      setUserDropdownVisibility("hidden");
    }
  };

  useUserDropdown(userDropdownRef);
  return (
    <header className="w-full bg-reddit_dark p-2">
      <div className="mx-4 flex">
        <img src={Logo} alt="Reddit logo" className="w-8 h-8 mr-4 mt-2"></img>
        <form
          action=""
          className=" p-1 px-4 flex rounded-md border-gray-600 bg-reddit_dark-bright mx-4 flex-grow"
        >
          <SearchIcon className="text-gray-500 h-7 w-7 mt-2" />
          <input
            type="text"
            className="bg-reddit_dark-bright h-6 m-2 text-sm p-1 pl-2 pr-0 block focus:outline-none text-white"
            placeholder="Search"
          ></input>
        </form>
        {/*<button className="px-3 py-1">
        <ChatIcon className="text-white w-8 h-8 m-1 mx-2" />
      </button>
      <button className="px-3 py-1">
        <BellIcon className="text-white w-8 h-8 m-1 mx-2" />
      </button>
      <button className="px-3 py-1">
        <PlusIcon className="text-white w-8 h-8 m-1 mx-2" />
      </button>
*/}
        <div className="mx-1 hidden sm:block">
          <Button outline="true" className="">
            Login
          </Button>
          <Button className="">Sign Up</Button>
        </div>

        <button
          className="rounded-md flex ml-4 mt-1 border border-gray-700"
          onClick={handleUserDropdown} ref={userDropdownRef}
        >
          <UserIcon className="w-8 h-8 mt-1 text-gray-300"></UserIcon>

          {/*<div className="bg-reddit_dark-bright rounded-md" >

        <img src={Avatar} alt="Reddit avatar" className="block w-8 h-8"/>}
</div>*/}

          <ChevronDownIcon className="text-gray-500 w-6 h-6 mt-1 m-1" />
        </button>
      </div>
      <div
        className={
          "absolute right-5 top-16 bg-reddit_dark border border-gray-700 z-5 rounded-md text-reddit_text overflow-hidden " +
          userDropdownVisibility
        }
      >
        <a
          href=""
          className="block flex w-50 py-2 px-3 hover:bg-gray-300 hover:text-black text-sm"
        >
          <LoginIcon className="w-6 h-5 mr-2" />
          Login / Sign Up
        </a>
      </div>
    </header>
  );
};

export default Header;
