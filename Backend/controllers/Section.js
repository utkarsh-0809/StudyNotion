const { promises } = require("nodemailer/lib/xoauth2");
const Course = require("../models/Course");
const Section = require("../models/Section");
const SubSection = require("../models/Sub-Section");

 
exports.createSection=async(req,res,next)=>{
    try{

    const {Name,CourseId}=req.body;

    if(!Name||!CourseId)
        res.status(400)
        .json({
            status:"fail",
            message:"Please insert Name and CourseID"
        })

    const CheckId=await Course.findById(CourseId);

    if(!CheckId)
        res.status(400)
        .json({
            status:"fail",
            message:"Course doesnt exist"
        })

   const newSection= await Section.create({
        Name
    })

   const updatedCourse= await Course.findByIdAndUpdate(CourseId,{
        $push:{CourseContent:newSection._id}
    },{new:true}).populate("CourseContent")//.populate("Sub_Section");

    res.status(400)
        .json({
            status:"success",
            message:"Section created",
            newSection
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


exports.updateSection=async(req,res)=>{
    try{
        const {Name,SectionId}=req.body;

        if(!Name||!SectionId)
            res.status(400)
            .json({
                status:"fail",
                message:"Please insert Name and SectionID"
            })

     const updatedSection=   await Section.findByIdAndUpdate(SectionId,{Name},{new:true});

        res.status(200)
        .json({
            status:"success",
            message:"Section created",
            updatedSection
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


exports.deleteSection=async(req,res)=>{
    try{
      const  {SectionId,CourseId}=req.body;

      if(!SectionId)
        res.status(400)
        .json({
            status:"fail",
            message:"Please insert SectionID"
        })

        const section=await Section.findById(SectionId);
        console.log(section);
        console.log('here');
        let nums=section.Sub_Section;
        console.log(nums);
        await Promise.all(nums?.map(async val=>{
           return await SubSection.findByIdAndDelete(val);
        }))
        console.log('here');
        await Section.findByIdAndDelete(SectionId);

        const course=await Course.findById(CourseId);
        console.log(course);
        let arr=course.CourseContent.filter(val=>val!==SectionId);

        course.CourseContent=arr;

       await course.save();

        res.status(200)
        .json({
            status:"success",
            message:"Section deleted",
            
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