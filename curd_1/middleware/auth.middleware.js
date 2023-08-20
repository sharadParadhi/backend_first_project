const jwt=require("jsonwebtoken")

const auth=async(req,res,next)=>{

    const token=req.headers.authorization?.split(" ")[1];
    if(token){
        const decoded=jwt.verify(token,"masai");
        if(decoded){
            console.log(decoded)
            req.body.userID=decoded.userID;
            req.body.user=decoded.user;
            next()
        }else{
            res.send({"msg":"please login again"})
        }
    }else{
        res.send({"msg":"Please login!"})
    }
}

module.exports={auth}