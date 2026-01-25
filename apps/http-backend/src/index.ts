import express, { Request, Response } from "express";
import cors from "cors";
import { SignupSchema, SigninSchema, RoomSchema } from "@repo/backend-common/types"
import { prisma } from "@repo/database/db";
import bcrypt, { hash } from "bcrypt";
import 'dotenv/config';
import jwt from "jsonwebtoken";
import { JWT_SECRET } from '@repo/backendcommon/config'
import { middleWare } from "./middleware";

const app = express();
const PORT = process.env.PORT || 3005;

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : ['http://localhost:3000', 'http://localhost:3001'];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(express.json());

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}

// Health check endpoint for Render
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

app.get('/', (req, res) => {
    res.json({
        message: "CollabBoard HTTP Backend API",
        version: "1.0.0",
        endpoints: {
            auth: ["/api/auth/signup", "/api/auth/signin"],
            rooms: ["/api/room", "/api/room/:slug"],
            chats: ["/api/chats/:roomId"]
        }
    })
})

app.post('/api/auth/signup', async (req, res) => {
    try {
        const Parseddata = SignupSchema.safeParse(req.body);
        // console.log(Parseddata)y

        if (!Parseddata.success) return res.json({
            message: "Incorrect Inputs"
        })
        const UniqueUser = await prisma.user.findUnique({ where: { email: Parseddata.data.email } })
        if (UniqueUser) return res.status(400).json({
            message: "User Already Exists!"
        })
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Parseddata.data.password, salt)
        if (!UniqueUser) {
            const newUser = await prisma.user.create({
                data: {
                    email: Parseddata.data.email,
                    password: hashedPassword,
                    name: Parseddata.data.name
                }
            })
            return res.status(200).json({
                message: "Account Created Succesfully!"
            })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Developer's Fault"
        })
    }
})

app.post('/api/auth/signin', async (req, res) => {
    try {
        const Parseddata = SigninSchema.safeParse(req.body);
        if (!Parseddata.success) return res.status(400).json({
            message: "Incorrect Credentials"
        })

        const user = await prisma.user.findFirst({ where: { email: Parseddata.data.email } })
        if (!user) return res.status(400).json({
            message: "Account Doesn't Exists!"
        })
        const CorrectCred = await bcrypt.compare(Parseddata.data.password, user.password);
        if (!CorrectCred) return res.status(400).json({
            message: "Invalid Credentials!"
        })
        if (CorrectCred) {
            const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
                expiresIn: "7d"
            })
            return res.status(200).json({
                message: "Logged In Successfully!", token
            })
        }

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Developer's Fault"
        })
    }

})

app.post('/api/room', middleWare, async (req: Request, res: Response) => {
    try {
        const Parseddata = RoomSchema.safeParse(req.body);
        if (!Parseddata.success) return res.status(400).json({
            message: "Incorrect Details"
        })
        //@ts-ignore
        const UserId = req.userId;
        const room = await prisma.room.create({
            data: {
                slug: Parseddata.data.roomId,
                adminId: UserId
            }
        })
        return res.status(200).json({
            message: "Room Created Successfully", room
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Developer's Fault"
        })
    }

})
app.get("/api/chats/:roomId", async (req, res) => {
    const roomId = Number(req.params.roomId)
    console.log("entered")
    const chat = await prisma.chat.findMany({
        where: {
            roomId
        },
        orderBy: {
            id: 'desc'
        },
        take: 500


    });
    return res.status(200).json({
        chat
    })
})
app.get("/api/room/:slug", async (req: Request, res: Response) => {
    try {
        const slug = req.params.slug;

        const room = await prisma.room.findFirst({
            where:
            {
                slug
            }
        })
        return res.status(200).json({
            message: room
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "internal server error"
        })
    }
})

// Global error handler
app.use((err: any, req: Request, res: Response, next: any) => {
    console.error('Global error handler:', err);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
    });
});

// Graceful shutdown
process.on('SIGTERM', async () => {
    console.log('SIGTERM received, closing server gracefully...');
    await prisma.$disconnect();
    process.exit(0);
});

process.on('SIGINT', async () => {
    console.log('SIGINT received, closing server gracefully...');
    await prisma.$disconnect();
    process.exit(0);
});

app.listen(PORT, () => {
    console.log(`🚀 CollabBoard HTTP Backend is live at port ${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
});


app.post('/api/auth/signup', async (req, res) => {
    try {
        const Parseddata = SignupSchema.safeParse(req.body);
        // console.log(Parseddata)y

        if (!Parseddata.success) return res.json({
            message: "Incorrect Inputs"
        })
        const UniqueUser = await prisma.user.findUnique({ where: { email: Parseddata.data.email } })
        if (UniqueUser) return res.status(400).json({
            message: "User Already Exists!"
        })
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Parseddata.data.password, salt)
        if (!UniqueUser) {
            const newUser = await prisma.user.create({
                data: {
                    email: Parseddata.data.email,
                    password: hashedPassword,
                    name: Parseddata.data.name
                }
            })
            return res.status(200).json({
                message: "Account Created Succesfully!"
            })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Developer's Fault"
        })
    }
})

app.post('/api/auth/signin', async (req, res) => {
    try {
        const Parseddata = SigninSchema.safeParse(req.body);
        if (!Parseddata.success) return res.status(400).json({
            message: "Incorrect Credentials"
        })

        const user = await prisma.user.findFirst({ where: { email: Parseddata.data.email } })
        if (!user) return res.status(400).json({
            message: "Account Doesn't Exists!"
        })
        const CorrectCred = await bcrypt.compare(Parseddata.data.password, user.password);
        if (!CorrectCred) return res.status(400).json({
            message: "Invalid Credentials!"
        })
        if (CorrectCred) {
            const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
                expiresIn: "7d"
            })
            return res.status(200).json({
                message: "Logged In Successfully!", token
            })
        }

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Developer's Fault"
        })
    }

})

app.post('/api/room', middleWare, async (req: Request, res: Response) => {
    try {
        const Parseddata = RoomSchema.safeParse(req.body);
        if (!Parseddata.success) return res.status(400).json({
            message: "Incorrect Details"
        })
        //@ts-ignore
        const UserId = req.userId;
        const room = await prisma.room.create({
            data: {
                slug: Parseddata.data.roomId,
                adminId: UserId
            }
        })
        return res.status(200).json({
            message: "Room Created Successfully", room
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Developer's Fault"
        })
    }

})
app.get("/api/chats/:roomId", async (req, res) => {
    const roomId = Number(req.params.roomId)
    console.log("entered")
    const chat = await prisma.chat.findMany({
        where: {
            roomId
        },
        orderBy: {
            id: 'desc'
        },
        take: 500


    });
    return res.status(200).json({
        chat
    })
})
app.get("/api/room/:slug", async (req: Request, res: Response) => {
    try {
        const slug = req.params.slug;

        const room = await prisma.room.findFirst({
            where:
            {
                slug
            }
        })
        return res.status(200).json({
            message: room
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "internal server error"
        })
    }
})


app.listen(3005, () => {
    console.log("APP IS LIVE AT 3005 PORT")
});
