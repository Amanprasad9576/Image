import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
    onModel:{
       type:String,
       required:true,
       enum :["post","comment"],
    },
    likeableId:{
        type:mongoose.Schema.Types.ObjectId,
        requried:true,
        refPath:"onModel",
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    }
},{timestamps:true});

const like = mongoose.model("Like",likeSchema);
export default like;