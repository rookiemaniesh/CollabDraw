import axios from "axios"
import { BACKEND_URL } from "../app/config"

async function getChats(roomId:string){
   const response= axios.get(`${BACKEND_URL}/chats/${roomId}`)
   //@ts-ignore
   return response.data.chat
}

export async function ChatRoom({id}:
    {
        id:string
}) {
    const chats=await getChats(id)
}