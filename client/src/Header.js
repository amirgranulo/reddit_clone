import Logo from "./logo.png";
import Avatar from "./reddit_avatar.png"
import {
  SearchIcon,
  BellIcon,
  ChatIcon,
  PlusIcon,
  ChevronDownIcon
} from "@heroicons/react/solid";

const Header = () => {
    return     <header className="w-full bg-reddit_dark p-2">
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
      <button className="px-3 py-1">
        <ChatIcon className="text-white w-8 h-8 m-1 mx-2" />
      </button>
      <button className="px-3 py-1">
        <BellIcon className="text-white w-8 h-8 m-1 mx-2" />
      </button>
      <button className="px-3 py-1">
        <PlusIcon className="text-white w-8 h-8 m-1 mx-2" />
      </button>
      <button className=" flex m-1 mx-1">
        <div className="bg-reddit_dark-bright rounded-md" >

        <img src={Avatar} alt="Reddit avatar" className="block w-8 h-8"/>
        </div>

        <ChevronDownIcon className="text-gray-500 w-8 h-8 m-1"/>
      </button>
    </div>
  </header>
}

export default Header;