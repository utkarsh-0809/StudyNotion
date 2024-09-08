function Button(props){
    
    const {BgColors}=props;
    const {text}=props
    const css=" px-2 py-2 border-solid border-b-2  border-r-2 rounded-lg hover:brightness-125 "+BgColors;
    //console.log(css);
    return (
    
        <button className={css}>{text}</button>
        
        
    )
}

export default Button