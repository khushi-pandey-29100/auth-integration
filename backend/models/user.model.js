import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        minLength:10,
        maxLength:10,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minLength:6,
    },
    products:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"products",
        }
    ]
},{
    timestamps:true,
}
);

export const UserModel = mongoose.model("users",userSchema);