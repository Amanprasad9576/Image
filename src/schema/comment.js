import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    content:{
      type:Text,
      required:true,
      minLength:1,
    },
    user:{
       type:mongoose.Schema.Types.ObjectId,
       required:true,
       ref:"User"
    },
    onModel:{
     type:String,
     required:true,
     enum:["Post","Comment"],
    },
    commentableId:{
     type:mongoose.Schema.Types.ObjectId,
     required:true,
     refPath:"onModel",
    },
    replies:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment",
    }]

},{timestamps:true});

const comment = mongoose.model("Comment",commentSchema);
export default comment;


// comment Schema 
// comment on post -- postId and user Detail 
// 
// 