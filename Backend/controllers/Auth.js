const Otp = require("../models/Otp");
const User=require('../models/User');
const Profile=require('../models/Profile')
const jwt=require('jsonwebtoken');
// const {sendEmail}=require('../config/email')

async function createToken(user){

    let payload={
       id:user._id,
       Email:user.Email,
       AccountType:user.AccountType
    }
    // payload= JSON.stringify(payload);
    const token=await jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"2d"})
    return token;
}

async function  check(otp){
    
    const find=await Otp.findOne({Otp:otp});

    if(find)
        return 1;
    else return 0;
}

exports.sendOtp=async(req,res,next)=>{
    try{
        
    const Email=req.body.email;

    if(!Email){
        res.status(400).json({
    status:"fail",
    message:"please provide an email"});
   
        }

    const checkUser=await User.findOne({Email});

    if(checkUser){
        res.status(400)
        .json({
            status:"fail",
            message:"User already exists or email is incorrect"
        })
    }

   let otp=  Math.floor((Math.random()*1000000)+1);
   let curr=await check(otp);
   while(curr){
    
    otp= Math.floor((Math.random()*1000000)+1);
   }

   const newOtp=await Otp.create({
    Otp:otp,Email
   })

   res.status(200).json({
    status:"success",
    message:"Otp sent succuessfull",
    otp
   })
   }
   catch(err){
    console.log("error occured while sendingOtp",err)
   }


}



exports.signup=async(req,res,next)=>{

    try{

    let {Email,FirstName,LastName,Password,ConfirmPassword,ContactNo,otp,AccountType}=req.body;

    if(!Email||!FirstName||!LastName||!Password||!ConfirmPassword||!ContactNo){
        res.status(400)
        .json({
            status:"fail",
            message:"please enter all the fields"
        })
        return;
    }

    const checkUser=await User.findOne({Email});

    if(checkUser)
        res.status(400)
        .json({
            status:"fail",
            message:"User already exists"
        })


    // not checking password and confirm password and relying on schema to do so

    

    const otp2=await Otp.find({Email}).sort({CreatedAt:-1}).limit(1);
   // console.log(otp2[0].Otp);
    if(!otp2[0]||otp2[0]?.Otp!==otp){
        res.status(400)
        .json({
            status:"fail",
            message:"otp dosent match please try again"
        })
        return;
    }

    const profileDetails=await Profile.create({
        Gender:null,
        Dob:null,
        About:null,
        ContactNumber:null
    })
    
    // we are using an api to generate image based on our firstname and lastname
    AccountType=AccountType||'User';
    const newUser=await User.create({
        Email,FirstName,LastName,Password,ConfirmPassword,ContactNo,
        CompleteProfile: profileDetails._id,AccountType,
        Image:`https://api.dicebear.com/5.x/initials/svg?seed=${FirstName} ${LastName}`
    })

    res.status(200)
    .json({
        status:"success",
        message:"User created",
        newUser
    })
    }
    catch(err){
        console.log("error in signup", err);
    }
}



exports.login=async(req,res,next)=>{

    try{

    
    const {Email,Password}=req.body;

    if(!Email||!Password)
        res.status(400)
    .json({
        status:"fails",
        message:"all fields are neccessary"
    })

    const user=await User.findOne({Email});

    if(!user)
        res.status(400)
    .json({
        status:"fails",
        message:"user doesn't exist!"
    })

    const checkPassword=await user.comparePassword(Password,user.Password)
   
    if(!checkPassword)
        res.status(400).json({
    message:"password doesn't matched"
    })

    const token=await createToken(user);

    user.token=token;
    user.Password=undefined;

    const options={
        expiresIn:new Date(Date.now()+1000*60*60*24*30),
        httpOnly:true
    }
    res.cookie('jwt',token,options).status(200)
    .json({
        status:"success",
        user,
        token
    })
    }
    catch(err){
        console.log("error occurred while logging in",err);
    }
} 


// exports.checkUserLoggedIn=async(req,res,next)=>{
//     try{

    
//     let token;
//     if(req.cookies){
//         token=req.cookies.jwt;
//     }
//     else{
//         res.send(400).json({message:"please login to continue"})
//     }

//     const decode=await promisify(jwt.verify)(token,process.env.JWT_SECRET);

//     const user=await User.findById(decode.id);

//     req.user=user;
//     next();
//    }
//    catch(err){
//     console.log(err);
//    }
// }


exports.changePassword=async(req,res,next)=>{
    try{

    const {oldPassword,newPassword,ConfirmPassword}=req.body;
    const {user}=req

    if(!oldPassword||!newPassword||!ConfirmPassword)
        res.status(400).json({message:"all fields are neccessary"});

    const checkPassword=await user.comparePassword(Password,user.Password);

    if(!checkPassword)
        res.status(400).json({
            message:"password doesn't matched"
            })

    user.Password=newPassword;
    user.ConfirmPassword=ConfirmPassword;

    await user.save();

    await sendEmail(user.email,'password changed successfully');

    res.status(200).json({message:"password changed successfully",user})
        }
        catch(err){
            console.log(err);
        }
}