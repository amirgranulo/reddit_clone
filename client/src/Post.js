import {Link} from "react-router-dom";
import timeSince from "./utils/timeSince";


const Post = (props) => {
  return (
    <div className=" px-5 text-reddit_text mt-6  ">
      <Link to={"/posts/" + props._id} className="bg-reddit_dark-bright block border border-black hover:border-reddit_text text-reddit_text  mt-6 cursor-pointer">
        <h4 className="text-reddit_text-darker mb-1">
          Posted by {props.author} {timeSince(props.postedAt) }
        </h4>

        <div className=" border-reddit_dark  p-2">
          <h2 className="text-2xl mb-3">{props.title}</h2>
          <div className="leading-5 text-sm">
            <p>
            {props.body}
            </p> 
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Post;
