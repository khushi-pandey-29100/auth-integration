export const errorMiddleware = (err, req, res, next) => {
    console.log("me error middleware hu",err.message)

    if (err.code === 11000) {
        return res.status(400).json({
            message: `${Object.keys(err.keyValue)[0]} already exists`,
        });
    }
    
    let status = err.statusCode  || 500;
    
    return res.status(status).json({
        success:false,
        message:err.message || "Internal Server Error",
    });
}