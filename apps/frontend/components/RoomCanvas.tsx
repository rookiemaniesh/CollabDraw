"use client"

import Canvas from "./Canvas";
import { WS_URL } from "@/config";
import { useEffect, useState } from "react"

export function RoomCanvas({ roomId }: { roomId: string }) {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const token = localStorage.getItem('token');
    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?${token}`)
        ws.onopen = () => {
            setSocket(ws);
            const data = JSON.stringify({
                type: "join-room",
                roomId
            });
            ws.send(data);
        }
    }, [])
    if (!socket) {
        return <div>
            Connecting to server......
        </div>
    }

    return <div>
        <Canvas roomId={roomId} socket={socket} />
    </div>

}