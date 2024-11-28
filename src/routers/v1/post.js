// Here all the router related to post written down
import express from 'express';
import {s3uploader} from '../../config/multerConfig.js';
import {createPost, getAllposts,deletePost, updatePost} from '../../controllers/postController.js';
import { validate } from '../../validators/zodValidation.js';
import { zodPostSchema } from '../../validators/zodPostSchema.js';
import { isAdmin, isAuthenticated } from '../../middlewares/authMiddleware.js';

const router = express.Router(); // Router object to modularize the routes


/**
 * @swagger
 * /posts:
 *  post:
 *      summary: Create a new post
 *      description: Create a new post
 * 
 */


router.post('/',isAuthenticated,s3uploader.single('image'),validate(zodPostSchema),createPost);

router.get('/',getAllposts);

router.delete('/:id',isAuthenticated,deletePost);

router.put('/:id',isAuthenticated,isAdmin,s3uploader.single('image'),updatePost);

export default router;
