const { mongo, default: mongoose } = require("mongoose");
const RatingsAndReviews=require('../models/RatingAndReview');
const Course = require("../models/Course");

exports.createRating=async(req,res)=>{
    try{
        const {courseId,Rating,Review}=req.body;

        const user=req.user;
        if(!Rating||!Review){
            res.status(401).json({
                status:"fail",
                message:"rating and review is compulsary"
            })
        }

        if(!user||!courseId){
            res.status(401).json({
                status:"fail",
                message:"please login or enter courseId"
            })
        }
        const uid=new mongoose.Types.ObjectId(courseId);
        const checkEnrolled=user.Courses.includes(uid);

        if(!checkEnrolled){
            res.status(401).json({
                status:"fail",
                message:"you need to buy course to review it"
            })
        }

        const course=await Course.findById(courseId);

        if(course.RatingsAndReviews.includes(uid)){
            res.status(401).json({
                status:"fail",
                message:"you have already review this course"
            })
        }


        const newFeedback=await RatingsAndReviews.create(
            {
                Rating,Review,User:user._id,Course:courseId
            }
        )

        course.RatingsAndReviews.push(newFeedback._id);

        await course.save();

        res.status(200).json({
            status:"success",
            message:"Feedback created successfully",
            newFeedback
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


exports.averageRating=async(req,res)=>{
    try{
        const {courseId}=req.body;

        const averageRating=await RatingsAndReviews.aggregate([
            {
                $match:{Course:new mongoose.Types.ObjectId(courseId)}
            },
            {
                $group:{
                    _id:null,
                    Average:{$avg:"$Rating"}
                }
                
            }
        ])
        res.status(200).json({
            status:"success",
            averageRating
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


exports.getAllRatingReview=async(req,res)=>{
    try{
        const response=await RatingsAndReviews.find()
                       .sort({Rating:-1})
                       .populate({
                        path:"User",
                        select:"FirstName LastName Image"
                       })
                       .populate({
                        path:"Course",
                        select:"Name"
                       }).exec();

        res.status(200).json({
        status:"success",
        data:response
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