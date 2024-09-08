const { default: mongoose } = require('mongoose');
const Category=require('../models/Category');
const Course = require('../models/Course');


exports.createCategory=async(req,res,next)=>{
    try{
        const {Name,Description}=req.body;

        if(!Name||!Description){
            res.status(400).json({
                status:"fail",
                message:"all fields are required"
            })
        }

        await Category.create({
            Name,Description
        })
        res.status(200).json({
            status:"success",
            message:"Category created"
        })
    }
    catch(err){
        res.status(200).json({
            status:"fail",
            message:"error occurred while creating Category",
            err
        })
    }
}


exports.getAllCategory=async(req,res)=>{
    try{
        const Category=await Category.find();

        res.status(200).json({
            status:"success",
            Category
        })
        
    }
    catch(err){
        res.status(200).json({
            status:"fail",
            message:err.message,
            err
        })
    }
}


exports.categoryPageDetails=async(req,res)=>{
    try{
        let {categoryId}=req.body;

        const coursesWithCategory=await Category.find({categoryId})
                                  .populate("Course")
                                  .exec();

        if(!coursesWithCategory)
            res.status(400).json({
                status:"fail",
                message:"cannot find this Category Courses"
            })

        const otherCourses=await Category.find({
            _id:{$ne:categoryId}
        }).populate("Course").exec();

        categoryId=new mongoose.Types.ObjectId(categoryId);
        const PopularCourses=await Course.aggregate()
        .match({Category:{$eq:categoryId}})
        .addFields({"length": {"$size":"$Enrolled"}}) //adds a new field, to the existing ones (incl. _id)
        .sort({"length":-1 })

        res.status(200).json({
            status:"success",
            data:{
                coursesWithCategory,
                otherCourses,
                PopularCourses
            }
        })
    }
    catch(err){

    }
}