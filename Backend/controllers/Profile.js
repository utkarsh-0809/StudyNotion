const Profile=require('../models/Profile')
const User=require('../models/User')
const {imageUpload}=require('./imageUploader');

exports.updateProfile=async(req,res)=>{
    try{
        const {Gender,Dob,About,Contact}=req.body;

        const updateOptions={};
        if(Gender)
            updateOptions.Gender=Gender;
        if(Dob)
            updateOptions.Dob=Dob;
        if(About)
            updateOptions.About=About;
        if(Contact)
            updateOptions.Contact=Contact;

        if(!updateOptions)
            res.status(400)
        .json({
            status:"fail",
            message:"Please Inset at least one field"
        })

        const user=req.user;

        const profileId=user.CompleteProfile;

       const newProfile= await Profile.findByIdAndUpdate(profileId,updateOptions,{new:true});

       res.status(200)
        .json({
            status:"success",
            message:"Profile created",
            newProfile
        })

    }
    catch(err){
        res.status(400)
        .json({
            status:"fail",
            message:err.message
        })
    }
}



exports.deleteProfile=async(req,res)=>{
    try{
        const user=req.user;

        await Profile.findByIdAndDelete(user.CompleteProfile);

        await User.findByIdAndDelete(user._id);

        res.status(200)
        .json({
            status:"success",
            message:"User DEleted"
        })

    }
    catch(err){
        res.status(500)
        .json({
            status:"fail",
            message:err.message
        })
    }
}


exports.getAllDetails=async(req,res,next)=>{
    try{
        const user=req.user;

        const currnetUser=await user.populate("CompleteProfile");

        res.status(200)
        .json({
            status:"success",
            currnetUser
        })

    }
    catch(err){
        res.status(500)
        .json({
            status:"fail",
            message:err.message
        })
    }
}

exports.uploadImage=async(req,res,next)=>{
    try{
    const file=req.files.displayPicture;
    console.log(file);
    if(!file){
        res.status(400).json({
            status:"fail",
            message:"please provide a file"
        })
    }
    const user=req.user;
    const pic= await imageUpload(file,process.env.FOLDER_NAME);
    const newUser=await User.findByIdAndUpdate(user._id,{Image:pic.url});

    res.status(200).json({
        status:"success",
        picUrl:pic.url
    })
}
catch(err){
    console.log(err);
}
   
}
