import express, { Request, Response } from "express";

import {SignupSchema,SigninSchema, RoomSchema} from "@repo/backend-common/types"
import {prisma} from "@repo/database/db";
import bcrypt, { hash } from "bcrypt";
import 'dotenv/config';
import  jwt  from "jsonwebtoken";
import {JWT_SECRET} from '@repo/backendcommon/config'
import { middleWare } from "./middleware";
const app=express();
app.use(express.json());


if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}
app.get('/',(req,res)=>{
    res.json({
        message:"Hello World"
    })
})

app.post('/api/auth/signup',async(req,res)=>{
    try {
        const Parseddata= SignupSchema.safeParse(req.body);
        // console.log(Parseddata)y

        if(!Parseddata.success)return res.json({
            message:"Incorrect Inputs"
        })
       const UniqueUser=await prisma.user.findUnique({where:{email:Parseddata.data.email}})
       if(UniqueUser)return res.status(400).json({
        message:"User Already Exists!"
       })
       const salt=await bcrypt.genSalt(10);
       const hashedPassword=await bcrypt.hash(Parseddata.data.password,salt)
       if(!UniqueUser){
        const newUser=await prisma.user.create({
            data:{
                email:Parseddata.data.email,
                password:hashedPassword,
                name:Parseddata.data.name
            }
        })
        return res.status(200).json({
            message:"Account Created Succesfully!"
        })
       }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message:"Developer's Fault"
        })
    }
})

app.post('/api/auth/signin',async(req,res)=>{
    try {
        const Parseddata=SigninSchema.safeParse(req.body);
        if(!Parseddata.success)return res.status(400).json({
            message:"Incorrect Credentials"
        })
        
        const user=await prisma.user.findFirst({where:{email:Parseddata.data.email}})
        if(!user)return res.status(400).json({
            message:"Account Doesn't Exists!"
        })
        const CorrectCred=await bcrypt.compare(Parseddata.data.password,user.password);
        if(!CorrectCred)return res.status(400).json({
            message:"Invalid Credentials!"
        })
        if(CorrectCred){
            const token=jwt.sign({userId:user.id},JWT_SECRET,{
                expiresIn:"7d"
            })
            return res.status(200).json({
                message:"Logged In Successfully!",token
            })
        }
        
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message:"Developer's Fault"
        })
    }

})

app.post('/api/room',middleWare,async(req:Request,res:Response)=>{
    try {
        const Parseddata=RoomSchema.safeParse(req.body);
        if(!Parseddata.success)return res.status(400).json({
            message:"Incorrect Details"
        })
        //@ts-ignore
        const UserId=req.userId;
        const room = await prisma.room.create({
            data:{
                slug:Parseddata.data.roomId,
                adminId:UserId
            }
        })
        return res.status(200).json({
            message:"Room Created Successfully" ,room
        })
        
    } catch (error) {
            console.error(error)
             return res.status(500).json({
                message:"Developer's Fault"
             })
    }

})
app.listen(3005,()=>{
    console.log("APP IS LIVE AT 3005 PORT")
});
