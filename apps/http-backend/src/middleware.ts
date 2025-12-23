import { JWT_SECRET } from "@repo/backendcommon/config";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";


export async function middleWare(req:Request,res:Response,next:NextFunction){
    try {
        const token=req.headers["authorization"] ?? "";
         const decoded=  jwt.verify(token,JWT_SECRET);
         if(!decoded)return res.status(400).json({
          message:"Not Logged In!"
         })
         if(decoded){
            //@ts-ignore
            req.userId=decoded.userId;
            next();
         }
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message:"Developer's Fault"
        })
    }
}