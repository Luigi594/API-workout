import express from 'express';
import { loginUser, signupUser } from '../controllers/userController.js';
import { ValidationSignup } from '../middleware/validations.js'

const router = express.Router();

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', ValidationSignup, signupUser)

export default router