const express=require("express");
const {NoteModel}=require("../models/noteModel")
const {auth}=require("../middleware/auth.middleware")

const noteRouter=express.Router()

// add new note
noteRouter.post("/create",auth,async(req,res)=>{
    try{
        const note=new NoteModel(req.body)
        await note.save()
        res.send({"msg":"new note has been added"})

    }catch(err){
        res.send({"errr":err.message})
    }
})


//  get all note here

noteRouter.get("/",auth,async(req,res)=>{
    try{
        const data=await NoteModel.find({userID:req.body.userID});
        res.send({"data":data})

    }catch(err){
        res.send({"err":err.message})
    }
})


// updataing the notes;
noteRouter.patch("/update/:noteID",auth,async(req,res)=>{
    const {noteID}=req.params;
    const note =await NoteModel.findOne({_id:noteID})
    try{
        if(req.body.userID!=note.userID){
            res.send({"msg":"user is not authorized"})
        }else{
            await NoteModel.findByIdAndUpdate({_id:noteID},req.body)
            res.send({"msg":`note of if ${noteID} is updated successfully`})
        }
       
    }catch(err){
        res.send({"errr":err})
    }
})

noteRouter.delete("/delete/:noteID",auth,async(req,res)=>{
    const {noteID}=req.params;
    const note =await NoteModel.findOne({_id:noteID})
    try{
        if(req.body.userID!==note.userID){
            res.send({"msg":"user is not authorized"})
        }else{
            await NoteModel.findByIdAndDelete({_id:noteID})
            res.send({"msg":`note of if ${noteID} is delete successfully`})
        }
       s
    }catch(err){
        res.send({"errr":err.message})
    }
})

module.exports={noteRouter}