const { default: mongoose } = require('mongoose');
const {instance}=require('../config/razorpay');
const Course = require('../models/Course');
const User = require('../models/User');
const sendEmail=require('../config/email');

exports.createPayment=async(req,res)=>{
    try{
        const {CourseId}=req.body;
        const user=req.user;

        if(!CourseId||!user){
            res.status(400)
            .json({
                status:"fail",
                message:"Please insert user and CourseId"
            })
        }

        const course=await Course.findById(CourseId);

        if(!course)
            res.status(400)
            .json({
                status:"fail",
                message:"Course no longer exists"
            })

        // const id=user._id;
        const uid=new mongoose.Types.ObjectId(user._id);

        if(user.Courses.includes(uid)){
            res.status(400)
            .json({
                status:"fail",
                message:"You have already purchased course with email id"
            })
        }


        const options = {
            amount: course.Price,  // amount in the smallest currency unit
            currency: "INR",
            receipt:Math.random(Date.now()).toString(),
            notes:{
                courseId:CourseId,
                userId:uid
            }
          };

        const paymentResponse=await  instance.orders.create(options);

        res.status(200)
        .json({
            status:"success",
            amount:paymentResponse.amount,
            currenct:paymentResponse.currency,
            orderId:paymentResponse.id,
            course
        })

    }
    catch(err){
        res.status(400)
        .json({
            status:"fail",
            message:err.message
        })
    }
}


exports.valdiatePayment=async(req,res)=>{
    try{
        const signature=req.headers['x-razorpay-signature']

        const shasum=crypto.createHmac('sha256',process.env.WEBHOOK_SECTRET);
        shasum.update(JSON.stringify(req.body));
        const digest=shasum.digest('hex');

        if(signature!==digest)
            res.status(500)
            .json({
                status:"fail",
                message:"signature and secret didnt matched"
            })

        

        const {courseId,userId}=req.body.payload.payment.entity.notes;

        const courseToEnroll=await Course.findByIdAndUpdate(courseId,
            {$push:{Enrolled:userId}}
            ,{new:true}
        )

        if(!courseToEnroll)
            res.status(500)
        .json({
            status:"fail",
            message:"Course no longer exist"
        })

        const updatedUser=await User.findByIdAndUpdate(userId,
            {$push:{Courses:courseId}}
            ,{new:true}
        )

        await sendEmail(updatedUser.Email,'payment successfull',
            `congrats you are successfully enrolled in ${courseToEnroll.Name}`);

            res.status(200)
            .json({
                status:"success",
                message:"enrolled successfully"
            })
    }
    catch(err){
        res.status(400)
        .json({
            status:"fail",
            message:err.message
        })
    }
}