
const subSectionController=require('../controllers/SubSection');
const express=require('express');
const auth=require('../middlewares/auth');

const router=express.Router();

router.use(auth.checkUserLoggedin,auth.restrictTo(['Admin','Instructor']));

router
.post('/create',subSectionController.createSubSection)
.patch('/update',subSectionController.updateSubSection)
.delete('/delete',subSectionController.deleteSubSection);


module.exports=router;

