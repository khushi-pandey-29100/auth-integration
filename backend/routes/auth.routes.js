import express from 'express';
import { forgetPasswordController, loginController, logoutController, registerController, resetPasswordController, updatePasswordController } from '../controllers/auth.controllers.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

export const router = express.Router();

router.get("/reset-password/:token",resetPasswordController);
router.post("/update-password/:id",updatePasswordController);

router.get("/current-user",authMiddleware,(req,res)=>{
    res.status(200).json({
        message:"current user route working",
        user:req.user,
    })
})
router.post("/register",registerController);
router.post("/login",loginController);
router.post("/logout",logoutController);

router.post("/forget-password",forgetPasswordController);