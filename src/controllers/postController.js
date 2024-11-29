import { createPostService, deletePostService, getAllPostService, updatePostService } from "../services/postService.js";

export async function createPost(req, res) {
    try {
      console.log("req.user:", req.user);
  
      const userDetails = req.user;
      console.log("User Details:", userDetails);
  
      console.log("req.user._id", req.user.id);
      userDetails.id = req.user.id;
  
      console.log("userDetails._id:", userDetails.id);
  
      if (!userDetails) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized: User details are missing",
        });
      }
  
      // Logging the request body and file location
      // Use req.file to access the uploaded file
      console.log("Request Body:", req.body);
      console.log("File Location:", req.file?.location);
  
      // Call the service function to create the post
      if (!req.file || !req.file.location) {
        return res.status(400).json({
          success: false,
          message: "Imgae is required",
        });
      }
      const post = await createPostService({
        caption: req.body.caption,
        image: req.file.location, // Assuming the file's URL is in ⁠ location ⁠
        user: userDetails.id,
      });
      return res.status(201).json({
        success: true,
        message: "Post created successfully",
        userId: req.user.id,
        data: post,
      });
    } catch (error) {
      // Error handling
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Error creating post",
        error: error.message,
      });
    }
  }
  

export async function getAllposts(req,res){
    
    try {
      const limit = req.query.limit || 10;
      const offset = req.query.offset || 0; 

      const paginatedPosts = await getAllPostService(offset,limit);
      return res.status(200).json({
        success:true,
        message:"All post fetched successfully",
        data:paginatedPosts
      })

    } catch (error) {
       console.log(error);
       return res.status(500).json({
        success:false,
        message:"Some Internal Problem"
       }) 
    }
}
export async function deletePost(req, res) {
    try {
        const postId = req.params.id;
        const userId = req.user.id;

       // const response = await deletePostService(postId, req.user._id);
       //  console.log("user in controller",req.user._id);

       console.log("Request to delete post:", postId, "by user:", userId);
        const response = await deletePostService(postId,userId);
         console.log("Respone",response);
        if(!response) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Post deleted successfully",
            data: response
        })
    } catch(error) {
        console.log(error);
        if(error.status) {
            return res.status(error.status).json({
                success: false,
                message: error.message
            })
        }
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}
 
export async function updatePost(req, res) {
    try {
        console.log("req file", req.file);
        const updateObject = req.body;
        if(req.file) {
            updateObject.image = req.file.location;
        }
        const response = await updatePostService(req.params.id, updateObject);
        return res.status(200).json({
            success: true,
            message: "Post updated successfully",
            data:response
        });
    } 
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}