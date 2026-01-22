"use client"
import { Auth } from "@/components/Auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Signin() {
    const router=useRouter();
    useEffect(()=>{
        const token=localStorage.getItem("token")
        if(token){
            router.replace("/dashboard");
        }
    },[])

    return <Auth type="signin" />;
}
