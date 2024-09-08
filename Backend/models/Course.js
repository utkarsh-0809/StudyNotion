const mongoose=require('mongoose');


const courseSchema=new mongoose.Schema({
   Name:{
    type:String,
   required:true,
   // trim:true,
    max:100
   },
   Description:{
    type:String,
   required:true,
    max:10000
   },
   Instructor:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:[true,'Course should have a instructor']
   }],
   Learnings:{
    type:String,
    max:10000
   },
   CourseContent:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"section",
   //  required:[true,'Course Content is required']
   }],
   RatingsAndReviews:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"RatingsAndReviews"
   }],
   Price:{
    type:Number,
    required:[true,'A course must have a price'],
    min:0
   },
   Thumbnail:{
    type:String
   },
   Category:{
    type:mongoose.Schema.ObjectId,
    ref:"Category",
    required:[true,'a course must have a Category']
   },
   Tags:[{
      type:String
   }],
   Enrolled:[{
    type:mongoose.Schema.ObjectId,
    ref:"user"
   }]

})

const Course=mongoose.model('Course',courseSchema);

module.exports=Course;