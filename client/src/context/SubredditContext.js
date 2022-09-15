import axios from "axios";
import React, { useEffect, useState } from "react";

const SubredditContext = React.createContext({});


export const SubredditContextProvider = ({children}) => { 

    const [visible,setVisible] = useState(false);
    const [title,setTitle] = useState("");
    const [subreddit,setSubreddit] = useState("");
    const [subredditInfo,setSubredditInfo] = useState({});
    useEffect(() => {
        if (!title) {
            return;
          }
        axios.get("/subreddits/"+title).then(response => {
            console.info("res "+response)
            setSubredditInfo(response.data);
        })
    },[title])

    return <SubredditContext.Provider value={{visible,setVisible,title,setTitle,subreddit,setSubredditInfo,subredditInfo}}  >
        {children}
    </SubredditContext.Provider>
}

export default SubredditContext;
