const asyncHandler = (func) =>{
    return (req, res, next)=>{
        Promise.resolve(func(req, res, next)).catch((err) =>next(err))
    }
}



// const asyncHandler = (func) =>  async(req, res, next) =>{
//     try {
//         await func(res, res, next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             status:false,
//             message:error.message
//         })
//     }
// }


export {asyncHandler}