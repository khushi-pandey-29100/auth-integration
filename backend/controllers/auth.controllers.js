import { UserModel } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendMail } from "../services/mail.service.js";
import { json } from "express";

export const registerController = async (req, res) => {
    try {
        console.log("------>", req.body)
        let { username, email, mobile, password } = req.body;

        if (!username || !email || !mobile || !password) {
            return res.status(401).json({
                message: "all filds are required",
            })
        }

        let hashPass = await bcrypt.hash(password, 10);

        let newUser = await UserModel.create({
            username,
            email,
            mobile,
            password: hashPass,
        })

        if (!newUser) {
            return res.status(401).json({
                message: "something went wrong",
                error
            })
        }

        let token = jwt.sign({ id: newUser._id }, process.env.JWT_Secret_key, { expiresIn: "1h" });

        res.cookie("token", token, {
            httpOnly: true,
        });

        return res.status(201).json({
            message: "user registered successfully",
            user: newUser,
        })
    } catch (error) {
        console.log("error in user registeration->", error)
        return res.status(500).json({
            message: "register controller error",
        })
    }
}
export const loginController = async (req, res) => {
    try {
        let { email, password } = req.body;

        if (!email || !password) {
            return res.status(404).json({
                message: "all fields are required",
            })
        }

        let user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "user not found"
            })
        }

        let comparePass = await bcrypt.compare(password, user.password);

        if (!comparePass) {
            return res.status(403).json({
                message: "invalid credentials",
            })
        }

        let token = jwt.sign({ id: user._id }, process.env.JWT_Secret_key, { expiresIn: "1h" });

        res.cookie("token", token, {
            httpOnly: true,
        })

        return res.status(200).json({
            message: "user logges in successfully",
            user,
        })
    } catch (error) {
        return res.status(500).json({
            message: "internal server error",
            error,
        })

    }
}
export const logoutController = async (req, res) => {
    try {
        let { user_id } = req.body;

        if (!user_id) {
            return res.status(404).json({
                message: "user id is required",
            });
        }
        res.clearCookie("token");

        return res.status(200).json({
            message: "user logged out successfully",
        })
    } catch (error) {
        return res.status(500).json({
            message: "internal server error",
            error,
        })
    }
}

export const forgetPasswordController = async(req,res)=>{
    try {
        let {email}=req.body;

        let existingUser= await UserModel.findOne({email});

        if(!existingUser){
            return res.status(404).json({
                message:"useer not found! unauthorize"
            })
        }
        let rawToken = jwt.sign(
            {id:existingUser._id},
            process.env.JWT_RAW_SECRET,
            {expiresIn:"10m"}
        )

        let resetPasswordLink = `http://localhost:3000/api/auth/reset-password/${rawToken}`;

        let send = await sendMail(
            "khushipandey29100@gmail.com",
            "Reset your password",
            resetPasswordLink,
        );
        return res.status(200).json({
            message:"password reset link sent to your email successfully",
        })
    } catch (error) {
        console.log("error while sending mail", error);
        return res.status(500).json({
            message: "Internal server error",
            error,
    });
    }
}

export const resetPasswordController = async(req,res)=>{
    try {
        let {token} = req.params;

        if(!token){
            return res.status(404).json({
                message:"token is missing",
            })
        }

        let decoded =jwt.verify(token,process.env.JWT_RAW_SECRET);

        return res.render("reset.ejs",{id:decoded.id});
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error,
    });
  }
}

export const updatePasswordController =async(req,res)=>{
    try {
        let {password}=req.body;
        let id=req.params.id;

        if(!password || !id){
            return res.status(404).json({
                message:"all fields are required",
            })
        }
        let hashPass = await bcrypt.hash(password,10);
        
        let updatedUser = await UserModel.findByIdAndUpdate(
            {
                _id:id,
            },
            {
                password:hashPass,
            },
            {
                new:true,
            }
        )
        return res.status(200).json({
            message:"password updated successfully",
            user:updatedUser,
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error,
    });
    }
}
