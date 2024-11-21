// Here all the router related to post written down
 
import express from 'express';
import {s3uploader} from '../../config/multerConfig.js';
import {createPost, getAllposts} from '../../controllers/postController.js';

const router = express.Router(); // Router object to modularize the routes

router.post('/',s3uploader.single('image'),createPost);

router.get('/',getAllposts);

export default router;
