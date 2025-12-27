import { WebSocket, WebSocketServer } from "ws";
import jwt, { decode } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backendcommon/config";
import { prisma } from "@repo/database/db";
const wss = new WebSocketServer({ port: 8080 });
console.log("WebSocket server running on ws://localhost:8080");


interface User {
    ws: WebSocket,
    userId: string,
    rooms: Number[]
}
const users: User[] = [];

function checkUser(token: string): string | null {
    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        console.log(decoded)
        if (typeof decoded == "string") {
            return null
        }
        if (!decoded || !decoded.userId) {

            return null
        }
        return decoded.userId
    } catch (error) {
        console.error(error)
        return null
    }
}
wss.on('connection', async function connection(ws, request) {
    console.log("========================================");
    console.log("New WS connection attempt");
    const url = request.url;
    console.log("Connection URL:", url);

    if (!url) {
        console.log("❌ No URL provided, closing connection");
        return;
    }

    const QueryParams = new URLSearchParams(url.split("?")[1]);
    const token = QueryParams.get('token');

    let userId: string | null = null;

    if (!token) {
        console.log("⚠️  No token provided - using test mode with default userId");
        // For testing purposes, allow connection without token
        userId = "test-user-" + Date.now();
        ws.send(JSON.stringify({
            type: "warning",
            message: "Connected in test mode without authentication. Use ?token=YOUR_JWT_TOKEN for authenticated access.",
            userId: userId
        }));
    } else {
        console.log("Token received, verifying...");
        userId = checkUser(token);

        if (userId == null) {
            console.log("❌ Invalid token or authentication failed");
            ws.send(JSON.stringify({
                type: "error",
                message: "Invalid or expired token"
            }));
            ws.close();
            return;
        }
        console.log("✅ User authenticated successfully. UserId:", userId);
    }

    users.push({
        userId,
        ws,
        rooms: []
    })
    console.log(`✅ User added to users array. Total connected users: ${users.length}`);
    console.log("========================================");

    ws.on('error', console.error);

    // Send welcome message on connection
    ws.send(JSON.stringify({
        type: "connection",
        status: "connected",
        userId: userId,
        message: "WebSocket connection established successfully"
    }));

    ws.on('message', async function message(data) {
        let parsedData: any;

        try {
            parsedData = JSON.parse(data.toString());
        } catch (err) {
            console.error("Invalid JSON:", data.toString());
            ws.send(JSON.stringify({
                type: "error",
                message: "Invalid JSON format"
            }));
            return;
        }
        console.log("RECEIVED:", parsedData);


        //    let parsedData:any;
        //    if(typeof data!= "string"){
        //     let parsedData=JSON.stringify(data.toString());
        //    }else{
        //     parsedData=JSON.parse(data)
        //    }
        if (parsedData.type === "join-room") {
            console.log("User joining room:", parsedData.roomId)
            const user = users.find(x => x.ws === ws)
            if (!user) {
                ws.send(JSON.stringify({
                    type: "error",
                    message: "User not found"
                }));
                return;
            }
            user.rooms.push(Number(parsedData.roomId))
            ws.send(JSON.stringify({
                type: "join-room",
                status: "success",
                roomId: parsedData.roomId,
                message: `Successfully joined room ${parsedData.roomId}`
            }));
        }
        if (parsedData.type === "leave-room") {
            console.log("User leaving room:", parsedData.roomId)
            const user = users.find(x => x.ws === ws)
            if (!user) {
                ws.send(JSON.stringify({
                    type: "error",
                    message: "User not found"
                }));
                return;
            }
            //@ts-ignore
            user.rooms = user?.rooms.filter(x => x !== parsedData.roomId)
            ws.send(JSON.stringify({
                type: "leave-room",
                status: "success",
                roomId: parsedData.roomId,
                message: `Successfully left room ${parsedData.roomId}`
            }));
        }
        if (parsedData.type === "chat") {
            console.log("Chat message received for room:", parsedData.roomId)
            const roomId = Number(parsedData.roomId);
            let message = parsedData.message;

            if (!roomId || !message) {
                ws.send(JSON.stringify({
                    type: "error",
                    message: "Missing roomId or message"
                }));
                return;
            }

            // Ensure userId is not null before saving
            if (!userId) {
                console.error("❌ Cannot save chat: userId is null");
                ws.send(JSON.stringify({
                    type: "error",
                    message: "User not authenticated"
                }));
                return;
            }

            try {
                // Check if room exists
                const roomExists = await prisma.room.findUnique({
                    where: { id: roomId }
                });

                if (!roomExists) {
                    console.error("❌ Room does not exist:", roomId);
                    ws.send(JSON.stringify({
                        type: "error",
                        message: `Room ${roomId} does not exist`
                    }));
                    return;
                }

                console.log("💾 Attempting to save chat to DB:", { roomId, message, userId });
                const savedChat = await prisma.chat.create({
                    data: {
                        roomId,
                        message,
                        userId
                    }
                });
                console.log("✅ Chat saved successfully to DB:", savedChat.id);
            } catch (error) {
                console.error("❌ DB OP Failed:", error);
                ws.send(JSON.stringify({
                    type: "error",
                    message: "Failed to save message to database"
                }));
                return;
            }

            // Broadcast to all users in the room
            let sentCount = 0;
            users.forEach(user => {
                if (user.rooms.includes(roomId)) {
                    user.ws.send(JSON.stringify({
                        type: "chat",
                        message: message,
                        roomId,
                        userId,
                        timestamp: new Date().toISOString()
                    }))
                    sentCount++;
                }
            })
            console.log(`Message broadcasted to ${sentCount} users in room ${roomId}`);
        }
    });
})