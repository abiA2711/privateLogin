import userService from "./userService.js";
import bcrypt from 'bcryptjs';
import { generateAuthToken } from './authHelper.js';
import MailHelper from "./mailService.js";
import Otp from "./otpmodel.js";
import otpService from "./otpService.js";


export default class userController {
    static async signup(req, res) {
        const { username, email, password } = req.body;
        console.log(username, email, password);
    
        try {
            if (!username) return res.status(400).send('UserName is required');
            if (!email) return res.status(400).send('Email is required');
            if (!password) return res.status(400).send('Password is required');
    
            // Check if the email is already taken by an existing user
            const findUser = await userService.findOne({ email });
            if (findUser) {
                return res.status(400).send('Email already in use');
            }
    
            
            const findEmail = await otpService.findOne({ email });
            if (findEmail?.otp) {
                return res.status(200).send("OTP already sent to your email");
            } else {
                
                const otp = Math.floor(1000 + Math.random() * 9000);
                const otpString = otp.toString();
    
              
                const otpRecord = new Otp({
                    email: email,
                    otp: otpString,
                });
    
                await otpRecord.save();
                
                //
                let abc = await MailHelper.sendMail(email, "Your OTP Code", `Your OTP is ${otpString}`);
                if (abc) {
                    return res.status(200).send("OTP sent successfully");
                } else {
                    return res.status(500).send('Failed to send OTP');
                }
            }
        } catch (error) {
            console.error('Error in signup:', error);
            return res.status(500).send('Internal server error');
        }
    }
    

    static async verifyotpAndSave(req, res) {
        const { username, email, password, otp } = req.body;
        try {
            if (!email) return res.status(400).send('Email is required');
            if (!password) return res.status(400).send('Password is required');
            if (!otp) return res.status(400).send('OTP is required');
    
            const findEmail = await otpService.findOne({ email });
            if (!findEmail) {
                return res.status(400).send("OTP expired! Please fill the form and verify again.");
            }
    
            if (findEmail.otp !== otp) {
                return res.status(400).send("Incorrect OTP, please try again.");
            }
    
            const existingEmail = await userService.findOne({ email });
            if (existingEmail) {
                return res.status(400).send("Email already in use. Please use a different email.");
            }
    
            // const hashedPassword = await bcrypt.hash(password, 10);
    
            const saveUser = await userService.saveUser(username, email, password);
            console.log("s",saveUser)
            if (!saveUser) {

                return res.status(500).send('Error in saving the user');
            }
    
            return res.status(200).send({ message: "User information saved successfully" });
    
        } catch (error) {
            console.error('Error during OTP verification and user save:', error);
            return res.status(500).send('Internal server error');
        }
    }
    

  static async login(req, res) {
    const { email, password } = req.body;
    try {
      if (!email) return res.status(400).send("Email is required");
      if (!password) return res.status(400).send("Password is required");

      const findUser = await userService.findOne({ email });
      if (!findUser) return res.status(400).send("User not found");

      const isMatch = await bcrypt.compare(password, findUser.password);
      if (!isMatch) return res.status(400).send("Invalid credentials");

      const token = generateAuthToken(findUser.email);

      return res.status(200).send({
        message: 'Login successful',
        token,
        user: {
          name: findUser.username,
          email: findUser.email
        }
      });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  static async getUserInfo(req, res) {
    try {
        console.log('req.user:', req.user);
        const { email } = req.user; // Assuming req.user contains the email directly
        let findUser = await userService.findOne({ email });

        if (findUser) {
            let data={
                userName:findUser.username,email:findUser.email
            }
            res.status(200).send(data);
        } else {
            res.status(404).send("User not found"); // Use 404 for not found
        }
    } catch (error) {
        res.status(500).send({ message: "An error occurred", error });
    }
}

}