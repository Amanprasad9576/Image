import express from 'express';
import {getProfile,signin,signup} from '../../controllers/userControllers.js';
import { zodSignupSchema } from '../../validators/zodSignupSchema.js';
import { validate } from '../../validators/zodValidation.js';
import {zodSigninSchema} from '../../validators/zodSigninSchema.js';
const router = express.Router();

router.get('/profile',getProfile);

/**
 * @swagger
 * /users/signup:
 *  post:
 *      summary: Signup a new user
 *      description: Signup a new user
 * 
 */


router.post('/signup',validate(zodSignupSchema),signup);

/**
 * @swagger
 * /users/signin:
 *  post:
 *      summary: Signin a new user
 *      description: Signin a new user
 * 
 */


router.post('/signin',validate(zodSigninSchema),signin);

export default router;

