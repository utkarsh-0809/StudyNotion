const mongoose=require('mongoose');
const validator = require("email-validator");

const sectionSchema=new mongoose.Schema({
   Name:{
    type:String,
    required:[true,'Section must have a suitable name'],
    max:100
   },
   Sub_Section:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"subsection",
    rquired:[true,'A section must have a cotent']
   }]

})

const Section=mongoose.model('section',sectionSchema);

module.exports=Section;