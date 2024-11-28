import { timeStamp } from 'console';
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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
},
  

},{ timestamps :true});

const post = mongoose.model("Post",postSchema);
export default post;