const express=require("express")
const {userRouter}=require("./routes/userRoutes")
const {noteRouter}=require("./routes/noteRoutes")
const { connection } = require("./db")
const cors=require("cors")

const app=express()
app.use(express.json())
app.use(cors())


app.use("/user",userRouter)
app.use("/note",noteRouter)



app.get("/",(req,res)=>{
    res.send("HOme page")
})



app.listen(8080,async()=>{
    try{
        await connection;
        console.log("db connect")
    }catch(err){
        console.log(err)
    }
    console.log("server is runninng 8080")
})