"use client"

import Canvas from "./Canvas";
import { WS_URL } from "@/config";
import { useEffect, useState } from "react"

export function RoomCanvas({ roomId }: { roomId: string }) {
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const ws = new WebSocket(`${WS_URL}?token=${token}`)
        ws.onopen = () => {
            setSocket(ws);
            const data = JSON.stringify({
                type: "join-room",
                roomId
            });
            ws.send(data);
        }
    }, [roomId])
    if (!socket) {
        return <div className="h-screen w-screen flex items-center justify-center text-white bg-neutral-950">
            Connecting to server......
        </div>
    }

    return <div className="h-screen w-screen overflow-hidden">
        <Canvas roomId={roomId} socket={socket} />
    </div>

}