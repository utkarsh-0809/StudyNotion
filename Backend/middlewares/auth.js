const User=require('../models/User');
const jwt=require('jsonwebtoken');
const {promisify}=require('util');

exports.checkUserLoggedin=async(req,res,next)=>{
    try{

    
    let token;
    if(req.cookies){
        token=req.cookies.jwt;
    }
    else{
        res.send(400).json({message:"please login to continue"})
    }
    if(!token){
        res.send(400).json({message:"please login to continue"})
    }
    //console.log(token);
    const decode=await promisify(jwt.verify)(token,process.env.JWT_SECRET);

    const user=await User.findById(decode.id);

    req.user=user;
    next();
   }
   catch(err){
    console.log(err);
   }
}



exports.restrictTo=(role)=>{
    return (req,res,next)=>{
        let str="";
        if(!role.includes(req.user?.AccountType)){
            
            role.forEach(element => {
                str+=element+" ";
            });
           return res.status(401).json({
            status:"fail",
            message:`this is a protected route for ${str}`
            })
        }
    
        next();
    }
}
