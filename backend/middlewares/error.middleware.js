export const errorMiddleware = (err, req, res, next) => {
    console.log("me error middleware hu",err.message)

    let status = err.statusCode  || 500;
    
    return res.status(status).json({
        success:false,
        message:err.message || "Internal Server Error",
    });
}