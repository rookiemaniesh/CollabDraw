import express from "express";

import {SignupSchema,SigninSchema} from "@repo/backend-common/types"
import {prisma} from "@repo/database/db";
import bcrypt, { hash } from "bcrypt";
import 'dotenv/config';

console.log('DATABASE_URL AT RUNTIME =', process.env.DATABASE_URL);

const app=express();

app.use(express.json());

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

app.listen(3005,()=>{
    console.log("APP IS LIVE AT 3005 PORT")
});
