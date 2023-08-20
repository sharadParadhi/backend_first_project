const express=require("express")
const { UserModel } = require("../models/userModel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")


const userRouter=express.Router()

userRouter.post("/register",async(req,res)=>{
    try{
    const {username,email,pass}=req.body;

    
    // const passRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^*?&])[A-Za-z\d!@#$%^*?&]{8,})$/
    // if(!passRegex.test(pass)){
    //     return res.send("pass should contain a-z,A-Z,1-9 and any speciall characher")
    // }
    
    // const existUser=await user.findOne({email})

    // console.log("existUsre",existUser)

    // if(existUser){
    //     return res.status(200).json({msg:"user is already exist"})
    // }
   
        bcrypt.hash(pass,5,async(err,hash)=>{
            if(err){
                res.send({"error":err})
            }else{
                const user =new UserModel({username,email,pass:hash})
                await user.save();
                res.status(200).json({"msg":"new user has been added"})
            }
        })

    }catch(err){
        res.send({"err":err})
    }
})

userRouter.get("/",async(req,res)=>{
    try{
        const users=await UserModel.find()
        console.log(users)
        res.send({"data":users})

    }catch(err){
        res.status(400).json({"err":err})
    }
   
    res.send({"data":"this the user home page"})
})


//login route
userRouter.post("/login",async(req,res)=>{
    const{email,pass}=req.body;
    try{
        const user =await UserModel.findOne({email});
        if(user){
            bcrypt.compare(pass,user.pass,(err,decoded)=>{
                if(decoded){
                    const token=jwt.sign({userID:user._id,user:user.username},"masai")
                    res.send({"msg":"logged in!",token})
                }else{
                    res.send({"error":err})
                }
            })

        }else{
            res.send({"msg:":"user not exist"})
        }
    }catch(err){
        res.status(400).send({"err":err})
    }
})

userRouter.patch("/update/:postId",async(req,res)=>{
    const userID=req.body.userID;
    const {postID}=req.params;
    try{
        const post =await UserModel.findOne({_id:postID});
    }catch(err){
        res.status(400).json({"err":err})
    }
})


module.exports={userRouter}
