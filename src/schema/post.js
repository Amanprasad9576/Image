import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
 caption:{
    type:String,
    required:true,
    minLength:5
  },
  image:{
    type:String,
    require:true,
  },
  user:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"User"
  }
});

const post = mongoose.model("Post",postSchema);
export default post;