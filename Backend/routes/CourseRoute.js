const courseController=require('../controllers/Course');
const express=require('express');
const auth=require('../middlewares/auth');

const router=express.Router();

router.use(auth.checkUserLoggedin);

router
.post('/create',auth.restrictTo(['Admin','Instructor']),courseController.createCourse)
.get('/getAll',courseController.getAllCourses)
.get('/details',courseController.getCourseDetails)

module.exports=router;
