import bcrypt from 'bcrypt';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import Session from '../models/Session.js';
import crypto from 'crypto';

const ACCESS_TOKEN_TTL = '15m' // 15 phut

const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000 // 14 ngay

export const Register = async(req, res)=>{
    try{
        const {username, password, email, firstName, lastName} = req.body;
        if(!username || !password || !email || !firstName || !lastName){
            return res.status(400).json({message: "Missing required username, password, email, firstName, lastName"});
        }
        // check if user exist
        const duplicate = await User.findOne({username});
        if(duplicate){
            return res.status(409).json({message: "User already exist"});
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is salt

        // create new user
        await User.create({
            username,
            hashedPassword,
            email,
            displayName: `${firstName} ${lastName}`
        });
        // return

        return res.sendStatus(204)
    }catch(error){
        console.error('Register error', error);
        return res.status(500).json({message: "System error"});
    }

}

export const Login = async(req, res)=>{
    try{
        // lay input    
        const {username, password, email, firstName, lastName} = req.body;
        if(!username || !password ){
            return res.status(400).json({message: "Missing required username, password"});
        }

        // lay hash password tu database de so voi password nguoi dung nhap vao
        const user = await User.findOne({username});
        if(!user){
            return res.status(401).json({message: "Userame or password is incorrect"}); 
        }

        // kiem tra password
        const passwordCorrect = await bcrypt.compare(password, user.hashedPassword);
        if(!passwordCorrect){
            return res.status(401).json({message: "Userame or password is incorrect"});
        }

        // neu dung thi tra ve token cho nguoi dung voi JWT
        const accessToken = jwt.sign({
            userId: user._id
        }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: ACCESS_TOKEN_TTL});
        
        // tao refresh token cho nguoi dung
        const refreshToken = crypto.randomBytes(64).toString('hex');

        // tao session moi de luu refresh token 
        await Session.create({
            userId: user._id,
            refreshToken,
            expireAt: Date.now() + REFRESH_TOKEN_TTL
        })

        // tra refresh token ve trong cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: REFRESH_TOKEN_TTL
        })

        // tra access token ve trong request

        res.status(200).json({message: `User ${user.displayName} logged in`, accessToken});

    }catch(error){
        console.error('Register error', error);
        return res.status(500).json({message: "System error"});
    }
}