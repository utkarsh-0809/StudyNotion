import { VscWhitespace } from "react-icons/vsc";
import { TypeAnimation } from "react-type-animation";
import ellipse from '../../../additional files/assets/Images/Ellipse 2 (1).png'
function CodeBlock(){
    const codeblock=`<!DOCTYPE html>
<html> <head>
<title>Example</title><linkrel="stylesheet"href="styles.css">
</head>
body>
h1><ahref="/">Header</a>
/h1>
nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>
/nav>`
    return (
    <div className="flex w-80 bg-richblack-800 h-64 pt-2 pl-2 mt-16 text-text-1">
        <div className="text-richblack-100">
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            

        </div>
       <img src={ellipse} className=" absolute h-80 w-96 z-40 -translate-x-28 -translate-y-20"></img>
        <div className="h-72 w-full flex-col text-sm pl-2">
            <TypeAnimation
                sequence={[codeblock,1000,""]}
                repeat={Infinity}
                cursor={true}
                style={
                   {
                    whiteSpace:"pre-line",
                    display:"block"
                   }
                }
                omitDeletionAnimation={true}
            />
                
           
        </div>

        </div>
    )
}

export default CodeBlock;