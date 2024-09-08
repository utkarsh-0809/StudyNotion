import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
// import Highlight from "../Home/Highlight";
// import Button from "../Home/Button";
// import banner from "../../../src/additional files/assets/Images/banner.mp4";
// import Section1Section1 from "./Section1Section1";
// import CodeBlock from "./CodeBlock";
// import { HomePageExplore } from "../../additional files/data/homepage-explore";
// import Section1Cards from "./Section1Cards";
import Highlight from '../Highlight';
import Button from '../Button';
import banner from '../../../additional files/assets/Images/banner.mp4';
import Section1Section1 from './Section1Section1';
import CodeBlock from './CodeBlock';
import {HomePageExplore} from '../../../additional files/data/homepage-explore';
import Section1Cards from './Section1Cards'
import { useState } from "react";

const HomeSection1=()=>{
    const navigate=useNavigate();
    const [selected,setSelected]=useState("Free");
    function Signup(){
            navigate('/signup')
    }
    const obj=HomePageExplore.filter(val=>val.tag===selected);
    const courses=obj[0].courses;
    
   let ChangeSelect=(val)=>{
    setSelected(val);
   }
  //  console.log(banner);
    return (
        
        <div className="flex flex-col w-3/5 h-fit text-white items-center justify-between mt-16">

            <button className="flex  p-3 pt-2 pb-2 items-center w-fit justify-evenly bg-richblack-700 rounded-full text-md border-solid border-b-2 text-richblack-50 border-richblack-400 hover:bg-richblack-800" onClick={Signup}>Become an instructor <FaArrowRight className="m-1 ml-5" />
            </button>
            <p className=" m-4 text-4xl font-inter flex w-full justify-center">Empower your carrer with <Highlight gap={1} text={"future skills"}></Highlight></p>
            <p className=" m-4 text-sm flex flex-col justify-center items-center text-center text-richblack-50">With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. Learn More Book a Demo</p>
            <div className=" m-4 flex w-1/2 justify-evenly">
                <Button flag={'yellow'} text={'Learn More'} BgColors={'bg-yellow-100 border-yellow-400  text-black'}></Button>
                <Button flag={'black'} text={'Book a Demo'} BgColors={'bg-richblack-700 border-richblack-400 text-richblack-50'}></Button>
            </div>
            <div className="m-4 mt-10 shadow-2x shadow-xl shadow-blue-200"> 
                <video muted loop autoPlay  >
                    <source src={banner} type="video/mp4"/>
                </video>
            </div>

            <div className=" w-full h-fit   flex justify-between flex-wrap">
                <Section1Section1 heading={"Unlock your coding potential with our"} highlight={"online courses"} content={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}></Section1Section1>
                <CodeBlock></CodeBlock>
                <CodeBlock></CodeBlock>
                <Section1Section1 heading={"Start"} highlight={"coding  in seconds"} content={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}></Section1Section1>
            </div>

            <div className="h-[500px] w-full relative top-28 flex-col ">
                <p className="w-full flex h-fit font-inter justify-center text-4xl">Unlock <Highlight gap={1} text={"The Power of Code"}></Highlight></p>
                <p className="text-richblue-50 text-md text-center m-2">Learn to build anything you can imagine</p>
                <div className="mt-10 mb-5 w-[full] flex rounded-full justify-evenly items-center h-[10%] bg-richblack-800">
                    {
                        HomePageExplore.map(val=>{
                            let check="";
                            if(val.tag===selected){
                                check="bg-richblack-900 border-[1px] border-richblack-700  rounded-3xl "
                            }
                            return (<button onClick={(e)=>ChangeSelect(val.tag)} className={"text-white  py-1 px-4 "+check}>{val.tag}</button>)
                        })
                    }
                </div>
                <div className="flex w-full justify-around p-4 h-1/2"> 
                    {
                        courses.map((val,i)=>{
                            console.log(i);
                       return <Section1Cards keys={i} value={val}></Section1Cards>
})
                    }
                </div>
            </div>
        </div>
    )
}

export default HomeSection1;
