const mongoose=require('mongoose');
const validator = require("email-validator");

const profileSchema=new mongoose.Schema({
    Gender:{
        type:String,
        enum:['male','female','others'],
    },
    Dob:{
        type:String
    },
    About:{
        type:String,
        max:1000,
        trim:true
        
    },
    ContactNumber:{
        type:Number
    },
    

})

const Profile=mongoose.model('profile',profileSchema);

module.exports=Profile;