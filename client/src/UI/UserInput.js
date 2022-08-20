const UserInput = (props) => {
    return (
        <input {...props} className={"bg-reddit_dark-bright text-reddit_text p-2 border-reddit_dark-bright rounded-md block "
        + props.className}/>
    )
}

export default UserInput;