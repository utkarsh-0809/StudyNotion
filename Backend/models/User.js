const mongoose=require('mongoose');
const validator = require("email-validator");
const bcrypt=require('bcrypt');


const userSchema=new mongoose.Schema({
    FirstName:{
        type:String,
        required:[true,'please enter your name'],
        trim:true
    },
    LastName:{
        type:String,
        required:[true,'please enter your name'],
        trim:true
    },
    Email:{
        type:String,
        unique:true,
        required:[true,'email is neccessary for a user'],
        validator:{
            validate:(val)=>validator.validate(val)
        }
    },
    ContactNo:{
        type:Number,
        
    },
    Password:{
        type:String,
        required:[true,'enter password'],
        min:4
    },
    ConfirmPassword:{
        type:String,
        required:[true,'enter confirm password'],
        validator:{
            validate:(val)=>val===this.Password
        }
    },
    AccountType:{
        type:String,
        enum:['Admin','User','Instructor'],
        defautl:'User'
    },
    Active:{
        type:Boolean,
        default:1
    },
    Approve:{
        type:Boolean
    },
    Courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }],
    CompleteProfile:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"profile"
    },
    CourseProgress:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CourseProgress"
    }],
    Image:{
        type:String
    },

    ResetPasswordToken:{
        type:String,
    },
    TokenExpiresIn:{
        type:Date
    }
})

userSchema.pre('save',async function(next){
    this.Password=await bcrypt.hash(this.Password,10);
    next();
})

userSchema.methods.comparePassword=async(inputPassword,passwordInDb)=>{
   let check=await bcrypt.compare(inputPassword, passwordInDb);

   return check;
}

const User=mongoose.model('user',userSchema);

module.exports=User;