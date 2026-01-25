import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: "khushipandey29100@gmail.com",
        pass: "cokxtssdarhtjmzo",
    }
})


export const sendMail =  async (to , subject , html)=>{
    let info = {
        to,
        subject,
        html
    }
    return await transporter.sendMail(info);
}