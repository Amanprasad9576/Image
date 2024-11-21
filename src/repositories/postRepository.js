import post from "../schema/post.js";

 export const createPostRepository = async (caption,image,user)=>{
   try {
      
      const newPost = await post.create({caption,image,user});
      return newPost;
     } catch (error) {
     console.log(error);
     }
}   

export const findAllPosts = async () =>{ 
   try {
    const posts = await post.find();
    return posts;
   } catch (error) {
    console.log(error);
   }
}

export const findPostById =async (id)=>{
    try {
     const post = await post.findById(id);
     return post  ;
    } catch (error) {
        console.log(error);
    }
}
 export const deletePostById = async (id)=>{
    try {
       const deletepost = await post.findByIdAndDelete(id);
       return deletepost;
    } catch (error) {
       console.log(error); 
    }
 }

