import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";

export let authMiddleware=async(req,res,next)=>{
    try {
        let token=req.cookies.token;
        console.log("cookies:", req.cookies);


        if(!token){
            return res.status(401).json({
                message:"token not found",
            })
        }
        let decode =jwt.verify(token,process.env.JWT_Secret_key);

        if(!decode){
            return res.status(401).json({
                message:"invalid token! unauthorized",
            }
            )
        }
        let user = await UserModel.findById(decode.id);

        if(!user){
            return res.status(400).json({
                message:"user not found",
            })
        }

        req.user=user;
        next();
    } catch (error) {
        console.log("error in auth middleware",error);
        return res.status(401).json({
            message:"invalid token ! unauthorized",
            error,
        })
    }

}