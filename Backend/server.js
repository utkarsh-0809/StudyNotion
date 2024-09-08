const { error } = require('console');
const express=require('express');
const courseRouter=require('./routes/CourseRoute');
const profileRouter=require('./routes/ProfileRoute');
const sectionRouter=require('./routes/SectionRoute');
const ratingRouter=require('./routes/RatingRoute');
const subSectionRouter=require('./routes/SubSection');
const categoryRouter=require('./routes/CategoryRoute');
const authRouter=require('./routes/AuthRoute');
const forgotRouter=require('./routes/ForgotPassword');
const {connect}=require('./config/database');
const {cloudinaryConnect}=require('./config/cloudinaryconnect');
const cors=require('cors');
const fileupload=require('express-fileupload');
const dotenv=require('dotenv');
const cookieParser=require('cookie-parser');

const app=express();


dotenv.config();
connect();
cloudinaryConnect();

app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin:`http://localhost:3000`,
        credentials:true
    })
)

app.use(
    fileupload({
        useTempFiles:true,
        tempFileDir:'/tmp'
    })
)


const port=process.env.PORT||4000
app.listen(port,error=>{
    if(error){
        console.log(error);
        alert(error.message);
    }
    else{
        console.log(`app running at port ${port}`)
    }
})

//app.get('/',()=>`<h1>hello</h1>`);

app.use('/api/v1/Course',courseRouter);
app.use('/api/v1/Profile',profileRouter);
app.use('/api/v1/Section',sectionRouter);
app.use('/api/v1/RatingAndReview',ratingRouter);
app.use('/api/v1/SubSection',subSectionRouter);
app.use('/api/v1/Category',categoryRouter);
app.use('/api/v1/Auth',authRouter);
app.use('/api/v1/ResetPassword',forgotRouter);
