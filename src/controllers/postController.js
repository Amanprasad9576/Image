import { createPostService } from "../services/postService.js";

export async function createPost(req, res) {
    try {
        // Logging the request body and file location
        console.log("Request Body:", req.body);
        console.log("File Location:", req.file?.location);  // Use req.file to access the uploaded file

        // Call the service function to create the post
        const post = await createPostService({
            caption: req.body.caption,
            image: req.file.location  // Get the image location from S3
        });

        // Respond after the post is created
        return res.status(201).json({
            success: true,
            message: "Post created successfully",
            data: post
        });
    } catch (error) {
        // Error handling
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error creating post",
            error: error.message
        });
    }
}
