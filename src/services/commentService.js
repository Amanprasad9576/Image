import { createComment, findCommentById } from "../repositories/commentRepository.js";
import { findPostById } from "../repositories/postRepository.js";

export const createCommentService = async (content, userId, onModel, commentableId) => {
    try {
        let parent = await fetchCommentParent(onModel, commentableId);
        if(!parent) {
            throw {
                message: `${onModel} not found`,
                status: 404
            }
        }

        const newComment = await createComment(content, userId, onModel, commentableId);

        await addChildCommentToParent(onModel, newComment, parent);

        return newComment;
            
    } catch(error) {
        console.log(error);
    }

}

export const findCommentByIdService = async (id) => {
    try {
        const comment = await findCommentById(id);
        if(!comment) {
            throw {
                message: "Comment not found",
                status: 404
            }
        }
        return comment;
    } catch(error) {
        console.log(error);
    }
}

const addChildCommentToParent = async (onModel, comment, parent) => {
    try {
        if(onModel === "Post") {
            parent.comments.push(comment.id);
        } else if(onModel === "Comment") {
            parent.replies.push(comment.id);
        }
        await parent.save();
    } catch(error) {
        console.log(error);
    }
}

const fetchCommentParent = async (onModel, commentableId) => {
    try {
        let parent;
        if (onModel === "Post") {
            parent = await findPostById(commentableId);
        } else if (onModel === "Comment") {
            parent = await findCommentById(commentableId);
        }
        return parent;
    } catch(error) {
        console.log(error);
    }
}



// create comment on post and comment 
// check the post and comment exist or not 
// first check the parent onWhich model
// fetch commentparent from the comment and the post 