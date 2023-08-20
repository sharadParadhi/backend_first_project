

const mongoose=require("mongoose")
require("dotenv").config()


const connection=mongoose.connect("mongodb+srv://sharadparadhi:"+encodeURIComponent("@2124Paradhi")+"@cluster0.yx1ofwp.mongodb.net/noteapp?retryWrites=true&w=majority")
// "mongodb+srv://sharadparadhi:"+encodeURIComponent("@2124Paradhi")+"@cluster0.yx1ofwp.mongodb.net/noteapp?retryWrites=true&w=majority"




module.exports={connection}