import HomeSection1 from './subComponents/HomeSection1';
import HomeSection2 from "./subComponents/HomeSection2";
import Section3 from './subComponents/Section3';
import Footer from "../../additional files/assets/Images/Footer.png"
function Home(){
    return(
       <div className="flex flex-col  bg-richblack-900 h-fit w-full  items-center justify-center">
            <HomeSection1/>
            <HomeSection2></HomeSection2>
            <Section3></Section3>
            <img className='w-full h-[80vh]' src={Footer}></img>
        </div>
    )
}

export default Home;