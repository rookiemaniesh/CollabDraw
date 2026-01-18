import axios from "axios"
import { BACKEND_URL } from "../app/config"
import { ChatRoomClient } from "./ChatRoomClient";

async function getChats(roomId:string){
   const response= axios.get(`${BACKEND_URL}/chats/${roomId}`)
   //@ts-ignore
   return response.data.messages;
}

export async function ChatRoom({id}:
    {
        id:string
}) {
    const messages=await getChats(id);
    return <ChatRoomClient id={id} messages={messages}/>
}