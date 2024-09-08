function Highlight(props){
    const {text,gap}=props;
    let classname="text-blue-200 "+(gap===1?" ml-2":"");
    console.log(classname);
    return (
        <p className={classname}>{text}</p>
    )
}

export default Highlight;