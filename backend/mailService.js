import nodemailer from 'nodemailer';
import 'dotenv/config'

export default class MailHelper {
    static async sendMail(to,subject,data){
        try{
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: process.env.EMAIL_ID,
                  pass: process.env.EMAIL_PASS
                },
                // logger: true,       // Enable logging for debugging
                // debug: true         // Show detailed logs
              });
              
          let info = await transporter.sendMail({
            from: process.env.EMAIL_ID, 
            to: to, 
            subject: subject, 
            html: data,
          });
          console.log("info")
          return info.messageId
        }
        catch(err){
            console.log(err);
            return "message not send",err
        }
    }
}