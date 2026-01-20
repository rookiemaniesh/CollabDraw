"use client"
import { initDraw } from "@/draw";
import { useEffect, useRef } from "react"

export default async function Canvas({params}:{
    params:{
        roomId:string
    }
}){
    const roomId= (await params).roomId
    const canvasRef=useRef<HTMLCanvasElement>(null);

    useEffect(()=>{

        if(canvasRef.current){
            const canvas = canvasRef.current;
            initDraw(canvas,roomId);
            
            
        }
    },[canvasRef])
    return <div>
    <canvas ref={canvasRef} width={2000} height={1000}>

    </canvas>
    </div>
}