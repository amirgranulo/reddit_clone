import React from "react";
const Button = (props) => {

  let classNames = "border border-gray-300 text-sm rounded-full px-3 font-bold h-8 mt-2 mr-1 ml-1 " + props.className;
  if (props.outline) {
    classNames += "text-gray-300 bg-reddit_dark_bright";
  }
  else {
    classNames += "bg-gray-300 text-reddit_dark";
  }
  return (
    <button {...props} className={classNames}>
    </button>
  );
};

export default Button;
