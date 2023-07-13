import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const validateToken = asyncHandler(async(req, res, next)=>{
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
            if(err){
                res.status(404);
                throw new Error("User not athorized");
            }
            req.user = decoded.user;
            next();
        });
        if(!token){
            res.status(401);
            throw new Error("Token expired or missing");
        }
    }
})

export default validateToken;