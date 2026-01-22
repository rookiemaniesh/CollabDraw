"use client"
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function AuthGuard({
    children,
}:{
    children:ReactNode
}){
    const router=useRouter()
    const [checking,Setchecking]=useState(true);
    useEffect(()=>{
        const token=localStorage.getItem("token")
        if(!token){
            router.replace("/signin")
        }else{
            Setchecking(false)
        }
    },[])
    if(checking){
        return <div>Checking auth</div>
    }
    return <>{children}</>
    
}