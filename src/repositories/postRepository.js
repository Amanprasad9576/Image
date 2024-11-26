import post from "../schema/post.js";

export const createPost = async (caption, image, user) => {
   try {
       const newPost = await post.create({ caption, image,user });
       // const newPost = new Post({ caption, image, user });
       // await newPost.save();
       return newPost;
   } catch(error) {
      console.error("Error in createPostRepository:", error);
      throw new Error("Database error: Unable to create post");

   }
}


export const findAllPosts = async (offset,limit) =>{ 
   try {
    const posts = await post.find().sort({createdAt:-1}).skip(offset)
.limit(limit).populate('user', 'username email _id');
    return posts;
   } catch (error) {
    console.log(error);
   }
}

export const findPostById =async (id)=>{
    try {
     const posts = await post.findById(id);
     return posts  ;
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
 export const countAllPosts = async ()=>{
   try {
      const count = await post.countDocuments();
      return count;
   } catch (error) {
     console.log(error) 
   }
 }
 export const updatePostById = async (id, updateObject) => {
   try {
       const posts = await post.findByIdAndUpdate(id, updateObject, { new : true });
       return posts;
   } catch(error) {
       console.log(error);
   }
}

