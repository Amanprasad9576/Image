// Here all the router related to post written down
 
import express from 'express';
import {s3uploader} from '../../config/multerConfig.js';
import {createPost, getAllposts,deletePost, updatePost} from '../../controllers/postController.js';
import { validate } from '../../validators/zodValidation.js';
import { zodPostSchema } from '../../validators/zodPostSchema.js';
const router = express.Router(); // Router object to modularize the routes

router.post('/',s3uploader.single('image'),createPost);

router.get('/',getAllposts);

router.delete('/:id',deletePost);

router.put('/:id',s3uploader.single('image'),validate(zodPostSchema),updatePost);

export default router;
