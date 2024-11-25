import express from 'express';
import {getProfile,signup} from '../../controllers/userControllers.js';
import { zodSignupSchema } from '../../validators/zodSignupSchema.js';
import { validate } from '../../validators/zodValidation.js';
const router = express.Router();

router.get('/profile',getProfile);

router.post('/signup',validate(zodSignupSchema),signup);

export default router;

