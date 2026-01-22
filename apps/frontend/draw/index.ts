import { HTTP_BACKEND } from "@/config";
import axios from "axios";
type Shape = {
    type: 'rect';
    x: number;
    y: number;
    width: number;
    height: number;
} | {
    type: "circle";
    centreX: number;
    centreY: number;
    radius: number;
}|{
    type:"line";
    startX:number;
    startY:number;
    endX:number;
    endY:number;
}

export async function initDraw(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {

    const ctx = canvas.getContext("2d");
    let existingShape: Shape[] = await getExistingShapes(roomId);

    if (!ctx) return;

    // Initial render of existing shapes
    ctx.strokeStyle = "white";
    clearCanvas(existingShape, canvas, ctx);

    socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === "chat") {
            const parsedShape = JSON.parse(message.message);
            existingShape.push(parsedShape.shape); // Unwrap the shape property
            clearCanvas(existingShape, canvas, ctx);
        }
    }
    ctx.strokeStyle = "white";
    let clicked = false;
    let startX = 0;
    let startY = 0;

    const mouseMoveHandler = (e: MouseEvent) => {
        if (clicked) {
            const width = e.clientX - startX;
            const height = e.clientY - startY;
            clearCanvas(existingShape, canvas, ctx);
            //@ts-ignore
            const selectedTool=window.selectedTool
            if(selectedTool=='rect'){
                ctx.strokeRect(startX, startY, width, height)
            }
            else if(selectedTool=='circle'){
                const centreX=startX+width/2;
                const centreY=startY+height/2;
                const radius=Math.max(width,height)/2
                ctx.beginPath();
                ctx.arc(centreX,centreY,radius,0,Math.PI*2)
                ctx.stroke();
                ctx.closePath();

            }else if(selectedTool=='line'){
                ctx.beginPath();
                ctx.moveTo(startX,startY)
                ctx.lineTo(e.clientX,e.clientY)
                ctx.stroke();
                // ctx.closePath();
            }
            
        }
    }

    const mouseDownHandler = (e: MouseEvent) => {
        clicked = true;
        startX = e.clientX;
        startY = e.clientY;
    }

    const mouseUpHandler = (e: MouseEvent) => {
        clicked = false;
        const width = e.clientX - startX;
        const height = e.clientY - startY;
        //@ts-ignore
        const selectedTool=window.selectedTool;
        let shape: Shape |null=null ;
        if(selectedTool=='rect'){
            shape = {
                type: 'rect',
                x: startX,
                y: startY,
                width,
                height
            }
        }
        else if(selectedTool=='circle'){
            shape = {
                type: 'circle',
                centreX: startX+width/2,
                centreY: startY+height/2,
                radius: Math.max(width,height)/2
            }
        }else if(selectedTool=='line'){
            shape = {
                type: 'line',
                startX: startX,
                startY: startY,
                endX: e.clientX,
                endY: e.clientY
            }
        }
       if(!shape)return;
        existingShape.push(shape);
        socket.send(JSON.stringify({
            type: "chat",
            message: JSON.stringify({
                shape
            }),
            roomId
        }))

    }

    canvas.addEventListener("mousedown", mouseDownHandler)
    canvas.addEventListener("mouseup", mouseUpHandler)
    canvas.addEventListener("mousemove", mouseMoveHandler)

    return () => {
        canvas.removeEventListener("mousedown", mouseDownHandler)
        canvas.removeEventListener("mouseup", mouseUpHandler)
        canvas.removeEventListener("mousemove", mouseMoveHandler)
    }
}
function clearCanvas(existingShape: Shape[], canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    existingShape.map((shape) => {
        if (shape.type == 'rect') {
            ctx.strokeRect(shape.x, shape.y, shape.width, shape.height)
        }
        else if(shape.type=='circle'){
            ctx.beginPath();
            ctx.arc(shape.centreX, shape.centreY, Math.abs(shape.radius), 0, Math.PI*2)
            ctx.stroke();
            ctx.closePath();
        }
        else if(shape.type=='line'){
            ctx.beginPath();
            ctx.moveTo(shape.startX, shape.startY);
            ctx.lineTo(shape.endX, shape.endY);
            ctx.stroke();
            ctx.closePath();
        }
      
     })
    }
export async function getExistingShapes(roomId: string) {
    console.log(roomId)
    const res = await axios.get(`${HTTP_BACKEND}/api/chats/${roomId}`);
    const chat = res.data.chat || []; // Backend returns 'chat', not 'messages'

    const shapes = chat.map((x: { message: string }) => {
        const messageData = JSON.parse(x.message);
        return messageData.shape; // Unwrap the shape property
    })
    return shapes;
};