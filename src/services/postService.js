import { countAllPosts, createPost, deletePostById, updatePostById } from "../repositories/postRepository.js";
import { findAllPosts } from "../repositories/postRepository.js";

export const createPostService = async (createPostObejct) => {
    const caption = createPostObejct.caption?.trim();
    const image = createPostObejct.image;
    const user = createPostObejct.user; 


    
    if (!caption || !image ) {
        throw new Error("Invalid input: caption, image, and user are required");
    }

    const post = await createPost(caption,image,user);
    console.log("user Service",user);
    return post;
}
export const getAllPostService = async (offset,limit) =>{
    const posts = await findAllPosts(offset,limit);

  // calculate the total post and total page   
    const totalDocument = await countAllPosts();
    const totalPage = Math.ceil(totalDocument/limit);
  return {
    posts, totalDocument, totalPage
  }
}

export const deletePostService = async (id)=>{
   // call the responsitory function
    const response = await deletePostById(id);
    return response;
}

export const updatePostService = async (id, updateObject) => {
    // call the repository function
    // hW: try top impl the logic to delete old image from aws in case of update of post image
    const response = await updatePostById(id, updateObject);
    return response;
}

