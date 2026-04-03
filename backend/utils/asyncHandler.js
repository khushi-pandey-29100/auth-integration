export const asyncHandler=(fs)=>(req,res,next)=>{
    Promise.resolve(fs(req,res,next)).catch(next);
}