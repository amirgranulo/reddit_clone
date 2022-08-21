import PostsList from "./PostsList";
import SubRedditHeader from "./SubredditHeader";
import PostForm from "./PostForm";
const SubReddit = () => {
  return <>
    <SubRedditHeader />
    <PostForm />
    <PostsList></PostsList>
  </>;
};

export default SubReddit;
