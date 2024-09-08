const mongoose=require('mongoose');
const validator = require("email-validator");
const {sendEmail}=require('../config/email')
const otpSchema=new mongoose.Schema({
  Email:{
   type:String,
   required:[true,'please enter the email']
  },
  CreatedAt:{
    type:Date,
    // required:true,
    default:Date.now(),
    expires:5*60
  },
  Otp:{
    type:String,
    required:true
  }
})

const sendmail=async(email,title)=>{
    try{

    await sendEmail(email,title);
    }
    catch(err){
        console.log('error occured at otp model while sending otp');
        console.log(err);
    }
}

otpSchema.pre('save',async function(next){
   await sendmail(this.Email,this.Otp);
    next();
})

const Otp=mongoose.model('Otp',otpSchema);

module.exports=Otp;