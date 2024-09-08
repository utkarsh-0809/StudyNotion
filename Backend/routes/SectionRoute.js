const sectionController=require('../controllers/Section');
const express=require('express');
const auth=require('../middlewares/auth');

const router=express.Router();

router.use(auth.checkUserLoggedin,auth.restrictTo(['Admin','Instructor']));

router
.post('/create',sectionController.createSection)
.patch('/update',sectionController.updateSection)
.delete('/delete',sectionController.deleteSection);


module.exports=router;
