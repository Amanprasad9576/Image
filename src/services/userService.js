import { createUser, findUserByEmail } from '../repositories/userRepository.js';
import user from '../schema/user.js';
import bcrypt from 'bcrypt';
import { generateJwtToken } from '../utils/jwt.js';

export const signupUserService = async (user)=>{
    try {
      const createuser = await createUser(user) ; 
      return createuser;
    } catch (error) {
     if(error.name ==="MongoServerError" && error.code ===11000){
        throw {
            status:400,
            message:"user with same email and password already exist"
        }
     }
     throw error;  
    }
}

export const signinUserService = async(userDetails)=>{
    try {
        // check email is unique or not
        const user = await findUserByEmail(userDetails.email);
        if(!user){
          throw {
              status:404,
              message:"user not found" 
            }
        } 


        // comapare the password  
         const isPasswordValid =bcrypt.compareSync(userDetails.password,user.password);
         if(!isPasswordValid){
            throw {
                status:404,
                message:"Password is not valid"
            }
         }
      
         const token = generateJwtToken({email:user.email,id:user.id,
username:user.username,role:user.role || "user" });
       return token;


    } catch (error) {
          throw error;
          console.log(error);
        }
 }

 export const checkIfUserExists = async (email) => {
    try {
        const user = await findUserByEmail(email);
        return user;
    } catch (error) {
        throw error;
    }
}