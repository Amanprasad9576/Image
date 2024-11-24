import { countAllPosts, createPostRepository, deletePostById, updatePostById } from "../repositories/postRepository.js";
import { findAllPosts } from "../repositories/postRepository.js";

export const createPostService = async (createPostObejct) => {
    const caption = createPostObejct.caption?.trim();
    const image = createPostObejct.image;

    const post = await createPostRepository(caption, image);

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

