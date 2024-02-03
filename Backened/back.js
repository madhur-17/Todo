const express=require('express');
const jwt=require('jsonwebtoken');
const mongoose=require("mongoose");
const port=3000;
const app=express();
app.use(express.json());
const secret="MADHUR17";


const TodoSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    completed:{
        type:Boolean,
        default:false,
    }
})
const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    } ,
    password:{
        type:String,
        required:true,
    },
    Todos: [TodoSchema],
})
const User=mongoose.model('User',UserSchema);

mongoose.connect(/*"url"*/{useNewUrlParser:true,useUnifiedTopology:true,dbName:"todos"});
const db=mongoose.connection;
db.on('error',(err)=>(console.error("Connection error",err)));
db.once('open',()=>(console.log("Connected to MongoDB")));


const authenciatejwt=(req,res,next)=>{
    const data=req.headers.authorization;
    const token=data.split(' ')[1];
    const user=jwt.verify(token,secret);
    if(user){
        res.send("authenticated");
        req.user=user;
        next();
    }

}
