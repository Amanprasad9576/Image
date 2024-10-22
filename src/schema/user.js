import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
   username:{
   type:String,
   required:true,
   unique:true,
   minLength: 5,
   },
   emailid:{
    type:String,
    require:true,
    unique:true,
    minLength:5,
    Validate:{
         validation : function(emailValue){
             return  /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(emailValue); 
          },
           message:'Invalid '
        },
    },
    password:{
      type:String,
       minLength:5,
    },
},{timestamps:true});

const user = mongoose.model("User",userSchema); // user collection
export default user;