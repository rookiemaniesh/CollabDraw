
import AuthGuard from "@/components/AuthGuard";
import { RoomCanvas } from "@/components/RoomCanvas";

export default async function CanvasPage({params}:{
    params:{
        roomId:string,

    }
}){
    const roomId= (await params).roomId
    
    return <div>
        <AuthGuard>
    
    <RoomCanvas roomId={roomId}/>
        </AuthGuard>
    </div>
}