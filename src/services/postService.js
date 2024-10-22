import { createPost } from "../repositories/postRepository.js";

export const createPostService = async (createPostObejct) => {
    const caption = createPostObejct.caption?.trim();
    const image = createPostObejct.image;

    const post = await createPostRepository(caption, image);

    return post;
}




