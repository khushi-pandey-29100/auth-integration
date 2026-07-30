import dotenv from "dotenv";
dotenv.config({ path: './.env' });  

import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import cookieParser from "cookie-parser";
import { router as authRoutes } from "./routes/auth.routes.js";
import { router as productRoutes } from "./routes/product.routes.js";
import morgan from "morgan";
import { errorMiddleware } from "./middlewares/error.middleware.js";

connectDB(); // call after dotenv.config()

const app = express();

app.set("view engine","ejs");

app.use(express.urlencoded({extended:true}));

app.use(cookieParser());
app.use(express.json());
app.use(errorMiddleware);

const allowedOrigins = [
  "http://localhost:5173",
  "https://auth-integration-theta.vercel.app",
  "https://auth-integration-a2et1udqx-khushi-pandey-29100s-projects.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
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

app.use(errorMiddleware);

console.log("PRIVATE KEY:", process.env.IMAGEKIT_PRIVATE_KEY);

app.listen(3000, () => {
    console.log("server is running on port 3000");
});
