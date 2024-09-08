const Course = require("../models/Course");
const User=require('../models/User');
const {imageUpload}=require('./imageUploader');
const Category = require("../models/Category");

exports.createCourse=async(req,res)=>{
    try{
        // console.log(req.files);
        //console.log(req);
    const {Name,Description,Price,Category2,Learnings}=req.body;
//    console.log(Name);
    const {Thumbnail}=req.files;
    const Instructor=req.user;

    if(!Name||!Instructor||!Description||!Price||!Category2)
        res.status(401).json({
    status:"fail",
    message:"all fields are neccessary"
        })

       const checkCategory=await Category.findById(Category2);
      //  console.log(checkCategory.Name);
        if(!checkCategory)
            res.status(401).json({
                status:"fail",
                message:"invalid Category"
            })

            const ThumbnailImage=await imageUpload(Thumbnail,process.env.FOLDER_NAME)
        //   console.log(ThumbnailImage.secure_url);
      let course=  await Course.create(
            {Name:Name,Description:Description,Price:Price,
                Thumbnail:ThumbnailImage.secure_url,
                Learnings:Learnings,
                Instructor:Instructor._id,
                Category:Category2
            }
            // ,{new:true}
        )

        const user=await User.findByIdAndUpdate(Instructor._id,
            {$push:{Courses:course._id}}
        )
        
        const category=await Category.findByIdAndUpdate(Category2,
            {$push:{Course:course._id}}
        )

        res.status(200).json({
            status:"success",
            message:"course created successfully",
            course
        })
    }
    catch(err){
        console.log(err);
        res.status(401).json({
            status:"fail",
            message:err.message
        })
    }
}


exports.getAllCourses=async(req,res)=>{
    try{
        let Courses=await Course.find().populate('Instructor').exec();

        res.status(200).json({
            status:"success",
            Courses
        })

    }
    catch(err){
        console.log(err);
        res.status(401).json({
            status:"fail",
            message:err.message
        })
    }
}



exports.getCourseDetails=async(req,res)=>{
    try{
        const {courseId}=req.body;

        const CompleteCourse=await Course.findById(courseId)
                             .populate({
                                path:"Instructor",
                                select:"Name"
                             })
                             .populate("CourseContent")
                             
                            
                            // .populate("RatingsAndReviews")
                             .populate("Category")
                             //.populate({
                            //     path:"Enrolled",
                            //     select:"Name"
                            //  })
                             .exec();

        res.status(200)
        .json({
            status:"success",
            CompleteCourse
        })
    }
    catch(err){
        console.log(err);
        res.status(401).json({
            status:"fail",
            message:err.message
        })
    }
}