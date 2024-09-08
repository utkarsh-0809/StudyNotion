const mongoose=require('mongoose');
const validator = require("email-validator");

const subSectionSchema=new mongoose.Schema({
   Title:{
    type:String,
    required:[true,'please give this sub-section a title'],
    trim:true
   },
   Time_Duration:{
    type:String
   },
   Description:{
    type:String,
    trim:true,
    max:100
   },
   VideoUrl:{
    type:String,
    required:[true,'a video is required'],
    trim:true
   },

})

const SubSection=mongoose.model('subsection',subSectionSchema);

module.exports=SubSection;