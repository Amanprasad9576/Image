import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const userSchema = new mongoose.Schema({
   username:{
   type:String,
   required:true,
   unique:true,
   minLength: 5,
   },
   email:{
    type:String,
    require:true,
    unique:true,
    minLength:5,
    validate:{
         validator : function(emailValue){
             return  /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(emailValue); 
          },
           message:'Invalid email format'
        },
    },
    role:{
      type:String,
      default:"user",
      enum:["user","admin"]
    },
    password:{
      type:String,
       minLength:5,
    },
},{ timestamps: true});

userSchema.pre('save',function modifyPassword(next){
   // incoming user object
   const user = this ; //object with plain password 
   const SALT = bcrypt.genSaltSync(10);
  // hash password

   const hashPassword = bcrypt.hashSync(user.password,SALT);
  // replace the password
   user.password = hashPassword;
   next();
});

const user = mongoose.model("User",userSchema); // user collection
export default user;