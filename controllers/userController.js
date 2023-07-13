import asyncHandler from "express-async-handler";
import User from "../models/userModel.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//@desc Register a user
//@route POST api/users/register
//@access public
export const registerUser = asyncHandler(async(req, res)=>{
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const userAvailable = await User.findOne({email});
    console.log(userAvailable);
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered")
    }
    //Hashed Password
    const hashPass = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password: hashPass
    });
    res.status(201).json({message: "User Created"});
})

//@desc Login  user
//@route POST api/users/login
//@access public
export const loginUser = asyncHandler(async(req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("Both fields are mandatory")
    }
    const user = await User.findOne({email});
    //compare the user password with hash pass
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "15m"})
        res.status(200).json({AccessToken: accessToken});
    }else{
        res.status(401);
        throw new Error("Email or Password not valid")
    }
})

//@desc Current User Info
//@route GET api/users/current
//@access private
export const currentUser = asyncHandler(async(req, res)=>{
    res.json({User: req.user});
})