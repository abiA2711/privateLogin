import Otp from "./otpmodel.js";


export default class otpService{
    static async findOne(query,param){
        try{
            return await Otp.findOne(query,param)

        }catch(error){
            return error;
        }
    }
}