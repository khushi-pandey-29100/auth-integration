import dotenv from "dotenv";
dotenv.config({ path: './.env' });  

import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import cookieParser from "cookie-parser";
import { router as authRoutes } from "./routes/auth.routes.js";
import { router as productRoutes } from "./routes/product.routes.js";
import morgan from "morgan";

connectDB(); // call after dotenv.config()

const app = express();

app.set("view engine","ejs");

app.use(express.urlencoded({extended:true}));

app.use(cookieParser());
app.use(express.json());

app.use(cors({
     origin: "http://localhost:5173", 
     credentials: true 
    })
);

app.use(morgan("dev"));

app.get("/",(req,res)=>{
    return res.render("index.ejs");
})

app.get("/email-page",(req,res)=>{
    return res.render("email.ejs");
})

app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);

app.listen(3000, () => {
    console.log("server is running on port 3000");
});
