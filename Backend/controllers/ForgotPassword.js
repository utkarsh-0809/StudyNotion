const User = require("../models/User");
const {sendEmail}=require("../config/email");
const crypto=require('crypto');
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

exports.sendResetLink=async(req,res,next)=>{
    try{

    const {Email}=req.body;

    if(!Email)
        res.status(401).json({message:"please enter email"});

    const user=await User.findOne({Email});

    if(!user)
        res.status(401).json({message:"user doesnt exist"});

    const token=crypto.randomUUID();
    const newUser=await User.findByIdAndUpdate(user._id,{
        ResetPasswordToken:token,
        TokenExpiresIn:Date.now()+1000*60*60*5
    },{
        new:true
    })

    const link=`http://localhost:${process.env.PORT}/ChangePassword/${token}`;

    sendEmail(Email,'Password reset Link',`${link}`)

    res.status(200).json({
        status:"success",
        link
    })
    }
    catch(err){
        console.log(err);
       return res.status(401).json({
            status:"fail",
            message:"something went wrong while sending resetLink",
            error:err
        })
    }
}


exports.resetPassword=async(req,res,next)=>{

    try{

    let link=req.params.link;

    const {newPassword,ConfirmPassword}=req.body;

    if(!link||req.body.link)
        link =req.body.link;


    if(!link)
        res.status(500).json({
    status:"fail",
    message:"link not found to resetpassword"
    })

    if(!newPassword||!ConfirmPassword)
        res.status(500).json({
    status:"fail",
    message:"all fields are neccessary"
    })

    const user=await User.findOne({ResetPasswordToken:link});

    if(!user||user.TokenExpiresIn<Date.now()){
        res.status(500).json({
            status:"fail",
            message:"this link has already expired, please try again"
            })
    }

    user.Password=newPassword;
    user.ConfirmPassword=ConfirmPassword;

    await user.save();


    res.status(200).json({
        status:"succeess",
        message:"password changed successfully"
    })
    }
    catch(err){
        console.log(err);
       return res.status(401).json({
            status:"fail",
            message:"something went wrong while resetting password",
            err
        })
    }
}