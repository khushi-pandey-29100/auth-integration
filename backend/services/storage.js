import dotenv from "dotenv";
dotenv.config({ path: './.env' });  
import ImageKit from "imagekit";

export const storageInstance = new ImageKit({
    publicKey:process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint:process.env.IMAGEKIT_URL
})

export const sendFileToIK = async(file , fileName) =>{
    return await storageInstance.upload({
        file,
        fileName,
        folder:"hm",
    });
}
