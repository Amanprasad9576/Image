import { countAllPosts, createPostRepository } from "../repositories/postRepository.js";
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




