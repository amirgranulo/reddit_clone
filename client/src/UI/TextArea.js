const TextArea = (props) => {
    return (
        <textarea {...props} className={"bg-reddit_dark-bright text-reddit_text p-2 border-reddit_dark-bright rounded-md block "
        + props.className}/>
    )
}

export default TextArea