import express from 'express'
import {  Login, refreshToken, Register, signOut } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', Register);

router.post('/login', Login);

router.post("/signout", signOut);

router.post("/refresh", refreshToken);



export default router