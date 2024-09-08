const nodemailer = require('nodemailer');


exports.sendEmail=async(email,title,body)=>{
    try{

    const transporter = nodemailer.createTransport({
        host:process.env.MAIL_HOST,
        auth: {
          user:process.env.MAIL_USER,
          pass:process.env.MAIL_PASS
        }
      });

      const mailOptions = {
        from:'Utkarsh Raghuvanshi',
        to:`${email}`,
        subject:`${title}`,
        html:`${body}`
      };
      
     await transporter.sendMail(mailOptions);
    }
    catch(err){
        console.log("error in sending mai",err);
    }
}



