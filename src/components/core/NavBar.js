import icon from '../../additional files/assets/Images/Logo.png';
import shopping from '../../additional files/assets/Images/fi-rr-shopping-cart.png';
import search from '../../additional files/assets/Images/Vector.png';
import profilepic from '../../additional files/assets/Images/Frame 86.png';
import { useState } from 'react';
function NavBar(){
    const check=window.location.pathname;
    const value='text-yellow-50';
   
    return (
        <div className="bg-richblack-900 w-full h-16 flex items-center justify-evenly border-b-[1px] border-richblack-600 text-text-1 font-inter">
            <img src={icon} className="h-[50%] w-[15%] "></img>
            <div className="h-full w-[40%] flex  items-center justify-evenly">
            <a href='/'  className={check=='/'?value:''}>Home</a>
            <div className='flex justify-center items-center'>
            <label for='catalog'>Catalog</label>
            <select  className='h-5 w-5  text-text-1 text-center bg-richblack-900 outline-none'  name='catalog'></select>
            </div>
            <a href='/aboutus' className={check=='/aboutus'?value:''}>About us</a>
            <a href='/contactus' className={check=='/contactus'?value:''}>Contact us</a>
            </div>
            <div className="h-full w-[20%] flex  items-center justify-evenly px-14">
               <img src={search}></img>
               <img src={shopping}></img>
               <img src={profilepic}></img>
            </div>

        </div>
    )
}

export default NavBar;