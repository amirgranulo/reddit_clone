import Button from "./UI/Button";
import UserInput from "./UI/UserInput";

const AuthentificationModal = () => {
  return (
    <div
      className="w-screen h-screen fixed top-0 left-0 z-20 flex"
      style={{ backgroundColor: "rgba(0,0,0,0.8" }}>
      <div className="w-3/4 sm:w-1/2 md:w-1/4 border border-gray-700 bg-reddit_dark p-5 
      text-reddit_text mx-auto self-center rounded-md">
        <h1 className="text-2xl mb-3">Login</h1>
        <label>
            <span className="text-gray-600 text-sm">username:</span>
            <UserInput type="text" className="mb-2 w-full"/>

        </label>
        <label>
            <span className="text-gray-600 text-sm">password:</span>
            <UserInput type="password" className="mb-2 w-full" />
        </label>
        <Button outline="true" className="w-full self-center">Log in</Button>
        </div>
    </div>
  );
};

export default AuthentificationModal;
