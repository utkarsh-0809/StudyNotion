const mongoose=require('mongoose');
const validator = require("email-validator");

const courseProgressSchema=new mongoose.Schema({
   CourseID:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Course",
    required:[true,'course Id is neccessary']
   },
   CompletedVideos:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Sub-Section"
   }
})

const CourseProgress=mongoose.model('CourseProgress',courseProgressSchema);

module.exports=CourseProgress;