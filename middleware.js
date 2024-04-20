const {JWT_SECRET} = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req,res,next) =>{
    const authHeader = req.headers.authorization;
    console.log(authHeader)
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(403).json({"message":"token not found"});
    }

    const token = authHeader.split(" ")[1];
    try{
        const decode = jwt.verify(token,JWT_SECRET);
        req.userId = decode.userId;
        next();
    }
    catch (err) {
        return res.status(403).json({});
    }
};

module.exports = {
    authMiddleware
}