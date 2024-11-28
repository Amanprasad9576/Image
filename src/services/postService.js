import { countAllPosts, createPost, deletePostById, findPostById, updatePostById } from "../repositories/postRepository.js";
import { findAllPosts } from "../repositories/postRepository.js";

export const createPostService = async (createPostObejct) => {
    const caption = createPostObejct.caption?.trim();
    const image = createPostObejct.image;
    const user = createPostObejct.user;
  
    if (!caption || !image) {
      throw new Error("Invalid input: caption, image, and user are required");
    }
  
    const post = (await createPost(caption, image, user)).populate(
      "user",
      "username email _id"
    );
    return post;
  };

export const getAllPostService = async (offset,limit) =>{
    const posts = await findAllPosts(offset,limit);

  // calculate the total post and total page   
    const totalDocument = await countAllPosts();
    const totalPage = Math.ceil(totalDocument/limit);
  return {
    posts, totalDocument, totalPage
  }
}

export const deletePostService = async (id,user)=>{
   // call the responsitory function
   console.log("User attempting to delete:", user);
    const post = await findPostById(id);
     if(post.user!= user){
        throw{
            status:401,
            message:"Unauthorised"
        }
     }
    const response = await deletePostById(id);
    return response;
}

export const updatePostService = async (id, updateObject) => {
    // call the repository function
    // hW: try top impl the logic to delete old image from aws in case of update of post image
    const response = await updatePostById(id, updateObject);
    return response;
}

