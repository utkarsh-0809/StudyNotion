// import Button from "../Home/Button";
// import Highlight from "../Home/Highlight";
// import timeline from '../../additional files/assets/Images/TimelineImage.png'
// import Section2Card1 from "./Section2Card1";
import Button from '../Button';
import Highlight from '../Highlight';
import timeline from '../../../additional files/assets/Images/TimelineImage.png';
import Section2Card1 from "./Section2Card1";

import image1 from '../../../additional files/assets/Images/Frame 55.png'
import image2 from '../../../additional files/assets/Images/Frame 57.png'
import image3 from '../../../additional files/assets/Images/Frame 74.png'
function HomeSection2(){
    return (
        <div className="bg-pure-greys-5 h-fit w-full pb-10">
        <div className=" home_bg w-full h-64 bg-pure-greys-5 flex justify-evenly px-96 items-center ">
           <Button BgColors="bg-yellow-100 border-yellow-400  text-black" text={"Explore Full Catalog"} ></Button>
           <Button flag={'black'} text={'Lear More'} BgColors={'bg-richblack-700 border-richblack-400 text-richblack-50'}></Button>
        </div>

        <div className="w-full h-fit flex px-40 py-20 font-inter justify-between" >
            <div className="w-fit h-fit ">
            <p className="text-2xl">Get the skills you need for a </p>
            <p className="text-2xl">
            <Highlight flag={1} text={"job that is in demand"}></Highlight>
            </p>
            </div>
            <div className="flex-col  w-1/2 h-28">
            <p className="text-sm mb-6">The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
            <Button BgColors="bg-yellow-100 border-yellow-400  text-black" text={"Learn More"} ></Button>
            </div>
        </div>

        <div className="h-fit w-full flex justify-evenly items-center px-40 ">
            <div className="relative h-56 translate-x-14  w-1 border-r-[1px] border-dashed border-black  ">

            </div>
            <div className="h-72 w-1/3  flex flex-col justify-between  ">
            <Section2Card1 Heading={"Leadership"} Sub_Heading={"fully commited to the success of company"}>
            </Section2Card1>
            <Section2Card1 Heading={"Responsibility"} Sub_Heading={"Students will always be our top priority"}>
            </Section2Card1>
            <Section2Card1 Heading={"Flexibility"} Sub_Heading={"The ability to switch is an important skills"}>
            </Section2Card1>
            <Section2Card1 Heading={"Solve the problem"} Sub_Heading={"Code your way to a solution"}>
            </Section2Card1>
            </div>
            <img src={timeline} alt="image" className="h-72 w-1/2 pl-10"></img>
            <div className=" absolute h-[16vh] w-[60vh] bg-caribbeangreen-700 translate-x-[220px] translate-y-36 flex justify-center items-center py-2 px-4">
                <div className='flex justify-center items-center w-1/2 font-inter'>
                    <p className='text-2xl text-white'>10</p>
                    <p className='text-xs text-caribbeangreen-500 ml-2'>YEARS
                    EXPERIENCES</p>
                </div>
                <div className='flex justify-center items-center w-1/2 font-inter border-l-2 border-caribbeangreen-500'>
                    <p className='text-2xl text-white ml-6'>250</p>
                    <p className='text-xs text-caribbeangreen-500 ml-2'>TYPES OF
                    COURSES</p>
                </div>
            </div>
          </div>
          {/* <div className=" absolute h-[20vh] w-[60vh] bg-caribbeangreen-700">

          </div> */}
          <div className='h-[120vh] w-full  px-16 py-14 flex flex-col mt-14 '>
            <div className='flex flex-col  w-full h-24'>
                <p className='h-fit w-full text-3xl font-semibold text-center flex justify-center items-center'>Your swiss knife for <Highlight text={"learning any language"} gap={1}></Highlight> </p>
                <p className='mx-auto mt-2 text-xs font-inter w-1/2 text-center'>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>
            </div>
            <div className='h-full w-[90%] flex mx-auto pr-20 '>
                <img className='h-2/3 translate-x-20 translate-y-6 w-2/3' src={image1}></img>
                <img className='h-[90%] z-20 w-1/2' src={image3}></img>
                <img className=' h-3/4 w-2/3 -translate-x-36 z-50' src={image2}></img>
            </div>
            <div className='flex w-full h-fit justify-center items-center'>
                <Button BgColors={" bg-yellow-50 h-fit w-fit "} text={"Learn more"}></Button>
            </div>
            </div>
        </div>
    )
}

export default HomeSection2;