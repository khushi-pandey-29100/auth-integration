import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        mongoose.connect(process.env.MONGODB_URI).then(()=>{
            console.log("connected");
        }).catch((err)=>{
            console.log(err);
        })
       
    } catch (error) {
        console.log("error in db connection",error);
    }
}