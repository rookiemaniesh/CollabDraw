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

    canvas.addEventListener("mousedown", (e) => {
        clicked = true;
        startX = e.clientX;
        startY = e.clientY;
    })
    canvas.addEventListener("mouseup", (e) => {
        clicked = false;
        const width = e.clientX - startX;
        const height = e.clientY - startY;
        const shape: Shape = {
            type: "rect",
            x: startX,
            y: startY,
            height,
            width
        }
        existingShape.push(shape);
        socket.send(JSON.stringify({
            type: "chat",
            message: JSON.stringify({
                shape
            }),
            roomId
        }))

    });

    canvas.addEventListener("mousemove", (e) => {
        if (clicked) {
            const width = e.clientX - startX;
            const height = e.clientY - startY;
            clearCanvas(existingShape, canvas, ctx);
            ctx.strokeRect(startX, startY, width, height)
        }
    })
}
function clearCanvas(existingShape: Shape[], canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    existingShape.map((shape) => {
        if (shape.type == 'rect') {
            ctx.strokeRect(shape.x, shape.y, shape.width, shape.height)
        }
    })
}
async function getExistingShapes(roomId: string) {
    console.log(roomId)
    const res = await axios.get(`${HTTP_BACKEND}/api/chats/${roomId}`);
    const chat = res.data.chat || []; // Backend returns 'chat', not 'messages'

    const shapes = chat.map((x: { message: string }) => {
        const messageData = JSON.parse(x.message);
        return messageData.shape; // Unwrap the shape property
    })
    return shapes;
};