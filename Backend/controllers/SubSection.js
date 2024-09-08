const {imageUpload}=require('./imageUploader');
const SubSection = require('../models/Sub-Section');
const Section=require('../models/Section');


exports.createSubSection=async(req,res,next)=>{
    try{
        const {Title,Time_Duration,Description,SectionId}=req.body;
        const video=req.files.VideoUrl;
        
        if(!Title||!Time_Duration||!Description||!video){
            res.status(400)
            .json({
                status:"fail",
                message:"Please insert All fields"
            })
        }
       console.log(video);

        const videoUrl=await imageUpload(video,process.env.FOLDER_NAME);
        if(!videoUrl){
            res.status(400).json({message:"file type not supported"});
        }
        console.log('done',videoUrl);
        const updatedSubsection=await SubSection.create(
            {Title,Time_Duration,Description,VideoUrl:videoUrl.secure_url},
           
        )

        const updatedSection=await Section.findByIdAndUpdate(SectionId,
            {$push:{Sub_Section: updatedSubsection._id}},
            {new :true}
        ).populate("Sub_Section");

        res.status(400)
        .json({
            status:"success",
            message:"Sub-Section created",
            updatedSubsection
        })
    }
    catch(err){
        res.status(200)
        .json({
            status:"fail",
            message:err.message
        })
    }
}


exports.updateSubSection=async(req,res)=>{
    try{
        const {Title,Time_Duration,Description,SubSectionId}=req.body;

        let toUpdate={};
        if(Title)
            toUpdate.Title=Title;
        if(Time_Duration)
            toUpdate.Time_Duration=Time_Duration;
        if(Description)
            toUpdate.Description=Description;

        if(!Name||!SubSectionId)
            res.status(400)
            .json({
                status:"fail",
                message:"Please insert Name and SubSectionID"
            })

     const updatedSubSection=   await SubSection.findByIdAndUpdate(SubSectionId, toUpdate,{new:true});

        res.status(200)
        .json({
            status:"success",
            message:"SubSection created",
            updatedSubSection
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


exports.deleteSubSection=async(req,res)=>{
    try{
      const  {SubSectionId}=req.params;

      if(!SubSectionId)
        res.status(400)
        .json({
            status:"fail",
            message:"Please insert SubSectionID"
        })
      
        await SubSection.findByIdAndDelete(SubSectionId);

        res.status(200)
        .json({
            status:"success",
            message:"SubSection deleted",
            
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