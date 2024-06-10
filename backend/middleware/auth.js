import jwt from "jsonwebtoken"

const authMiddleware = async (req,res,next) =>{
    const {token} = req.headers;
    if(!token){
        return res.json({success:false,message:"Not Authorized Login Again"})
    }
    try {
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}
// this middleware with get the token ans convert into the user id, with this user id we can add, remove ,get the data from cart
export default authMiddleware