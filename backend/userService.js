import userModel from "./userModel.js";

export default class userService{
    static async findOne(query,param){
        try{
            return await userModel.findOne(query,param)

        }catch(error){
            return error;
        }
    }
    static async saveUser(username, email, password) {
        try {
            
            const newUser = new userModel({
                username,
                email,
                password,  
            });

            
            return await newUser.save();
        } catch (error) {
           
            return { error: error.message };
        }
    }
}