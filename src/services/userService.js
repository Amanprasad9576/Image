import { createUser } from '../repositories/userRepository.js';
import user from '../schema/user.js';


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