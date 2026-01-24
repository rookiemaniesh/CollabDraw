# 🎨 CollabBoard

> **An Intuitive Online Whiteboard For Teams To Ideate And Collaborate In Real-Time** ✨

[![Made with Love](https://img.shields.io/badge/Made%20with-♡-ff69b4.svg)](https://github.com/rookiemaniesh/CollabDraw)
[![Next.js](https://img.shields.io/badge/Next.js-16.1.3-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue?logo=typescript)](https://www.typescriptlang.org/)
[![WebSocket](https://img.shields.io/badge/WebSocket-Real--time-green)](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
[![Turborepo](https://img.shields.io/badge/Turborepo-Monorepo-blueviolet)](https://turbo.build/)

---

## 🚀 What is CollabBoard?

CollabBoard is a **real-time collaborative whiteboard** that lets teams brainstorm, sketch, and create together—no matter where they are. Think of it as your digital canvas where ideas flow freely and collaboration happens seamlessly. 

Whether you're planning your next big project, teaching a class, or just doodling with friends, CollabBoard has got you covered. And yes, it's currently in **[BETA]**, so expect some rough edges (we're working on it! 🛠️).

---

## ✨ Features

- 🎨 **Real-Time Collaboration** - Draw, sketch, and create with your team in real-time
- 💬 **Built-in Chat** - Communicate without leaving the canvas
- 🔐 **Secure Authentication** - JWT-based auth to keep your boards private
- 🌙 **Dark Mode** - Easy on the eyes, hard on procrastination
- 📱 **Responsive Design** - Works beautifully on desktop and mobile
- 🚀 **Lightning Fast** - Built with Next.js and optimized for performance
- 🎭 **Room-based Sessions** - Create or join rooms with unique IDs

---

## 🏗️ Architecture

CollabBoard is a **Turborepo monorepo** with three main applications working in perfect harmony:

```
CollabBoard/
├── apps/
│   ├── frontend/          # Next.js 16 + React 19 + TailwindCSS
│   ├── http-backend/      # Express REST API
│   └── ws-backend/        # WebSocket Server for real-time magic
└── packages/
    ├── database/          # Prisma ORM + PostgreSQL
    └── backend-common/    # Shared types and configs
```

### 🎯 Frontend (`apps/frontend`)
The face of CollabBoard—a sleek, modern Next.js application with:
- **Framework**: Next.js 16.1.3 with React 19
- **Styling**: TailwindCSS 4 (because life's too short for vanilla CSS)
- **Icons**: Lucide React (clean, crisp, and customizable)
- **HTTP Client**: Axios for API calls
- **Features**: 
  - Landing page with animated gradients
  - Authentication (Sign In/Sign Up)
  - Dashboard for creating/joining rooms
  - Real-time canvas with drawing tools
  - Integrated chat system

### 🔧 HTTP Backend (`apps/http-backend`)
The REST API that handles all the heavy lifting:
- **Framework**: Express.js
- **Database**: PostgreSQL via Prisma ORM
- **Authentication**: JWT with bcrypt password hashing
- **Port**: 3005
- **Endpoints**:
  - `POST /api/auth/signup` - Create a new account
  - `POST /api/auth/signin` - Login and get JWT token
  - `POST /api/room` - Create a new collaboration room
  - `GET /api/room/:slug` - Get room details
  - `GET /api/chats/:roomId` - Fetch chat history

### ⚡ WebSocket Backend (`apps/ws-backend`)
The real-time engine that makes collaboration possible:
- **Technology**: WebSocket (ws library)
- **Port**: 8080
- **Authentication**: JWT token verification
- **Features**:
  - Real-time drawing synchronization
  - Room-based messaging
  - User presence tracking
  - Chat message persistence
- **Message Types**:
  - `join-room` - Join a collaboration room
  - `leave-room` - Leave a room
  - `chat` - Send/receive chat messages
  - `draw` - Broadcast drawing actions

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16, React 19, TypeScript, TailwindCSS 4 |
| **Backend** | Express.js, Node.js |
| **Real-time** | WebSocket (ws) |
| **Database** | PostgreSQL + Prisma ORM |
| **Authentication** | JWT + bcrypt |
| **Monorepo** | Turborepo |
| **Package Manager** | pnpm 9.0.0 |
| **Language** | TypeScript 5.9.2 |

---

## 🚦 Getting Started

### Prerequisites

Before you dive in, make sure you have:
- **Node.js** >= 18.x
- **pnpm** 9.0.0 (or install it with `npm install -g pnpm`)
- **PostgreSQL** database running
- A cup of coffee ☕ (optional but recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rookiemaniesh/CollabDraw.git
   cd CollabBoard
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   
   Create `.env` files in the following locations:
   
   **`apps/http-backend/.env`**
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/collabboard"
   JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
   ```
   
   **`apps/ws-backend/.env`**
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/collabboard"
   JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
   ```
   
   **`apps/frontend/.env.local`**
   ```env
   NEXT_PUBLIC_HTTP_BACKEND=http://localhost:3005
   NEXT_PUBLIC_WS_BACKEND=ws://localhost:8080
   ```

4. **Set up the database**
   ```bash
   cd packages/database
   npx prisma migrate dev
   npx prisma generate
   cd ../..
   ```

5. **Start the development servers**
   ```bash
   pnpm run dev
   ```

   This will start:
   - 🎨 Frontend: http://localhost:3000
   - 🔧 HTTP Backend: http://localhost:3005
   - ⚡ WebSocket Server: ws://localhost:8080

---

## 📦 Available Scripts

From the root directory:

```bash
# Start all services in development mode
pnpm run dev

# Build all applications
pnpm run build

# Run linting across all packages
pnpm run lint

# Format code with Prettier
pnpm run format

# Type checking
pnpm run check-types
```

### Individual App Scripts

**Frontend:**
```bash
cd apps/frontend
pnpm run dev      # Start Next.js dev server
pnpm run build    # Build for production
pnpm run start    # Start production server
```

**HTTP Backend:**
```bash
cd apps/http-backend
pnpm run dev      # Start with nodemon
pnpm run build    # Compile TypeScript
pnpm run start    # Run compiled version
```

**WebSocket Backend:**
```bash
cd apps/ws-backend
pnpm run dev      # Start with nodemon
pnpm run build    # Compile TypeScript
pnpm run start    # Run compiled version
```

---

## 🎮 How to Use

1. **Sign Up** - Create your account at `/signup`
2. **Sign In** - Login at `/signin`
3. **Dashboard** - Choose to create a new canvas or join an existing one
4. **Collaborate** - Start drawing, chatting, and creating with your team!

### Creating a Room
- Click "Create New Canvas" on the dashboard
- You'll be redirected to your new room with a unique ID
- Share the room ID with your team

### Joining a Room
- Click "Join Canvas" on the dashboard
- Enter the room ID shared by your teammate
- Start collaborating instantly!

---

## 🗂️ Project Structure

```
CollabBoard/
├── apps/
│   ├── frontend/
│   │   ├── app/                    # Next.js app directory
│   │   │   ├── page.tsx           # Landing page
│   │   │   ├── dashboard/         # Dashboard page
│   │   │   ├── signin/            # Sign in page
│   │   │   ├── signup/            # Sign up page
│   │   │   └── canvas/[id]/       # Canvas room page
│   │   ├── components/            # React components
│   │   │   ├── Auth.tsx           # Authentication component
│   │   │   ├── canvas.tsx         # Canvas drawing component
│   │   │   └── RoomCanvas.tsx     # Room wrapper component
│   │   └── draw/                  # Drawing logic
│   │
│   ├── http-backend/
│   │   └── src/
│   │       ├── index.ts           # Express server
│   │       └── middleware.ts      # JWT middleware
│   │
│   └── ws-backend/
│       └── src/
│           └── index.ts           # WebSocket server
│
└── packages/
    ├── database/
    │   ├── prisma/
    │   │   └── schema.prisma      # Database schema
    │   └── db.ts                  # Prisma client
    │
    └── backend-common/
        ├── types.ts               # Shared Zod schemas
        └── config.ts              # Shared configuration
```

---

## 🔐 Authentication Flow

1. User signs up with email, name, and password
2. Password is hashed using bcrypt (10 salt rounds)
3. User signs in with email and password
4. Backend verifies credentials and issues a JWT token (7-day expiry)
5. Frontend stores token in localStorage
6. Token is sent with HTTP requests (Authorization header)
7. Token is sent with WebSocket connection (query parameter)

---

## 🌐 API Documentation

### REST API Endpoints

#### Authentication

**POST** `/api/auth/signup`
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**POST** `/api/auth/signin`
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```
Response:
```json
{
  "message": "Logged In Successfully!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Rooms

**POST** `/api/room` (Requires Authentication)
```json
{
  "roomId": "abc123xyz"
}
```

**GET** `/api/room/:slug`

**GET** `/api/chats/:roomId`

### WebSocket API

**Connection:**
```
ws://localhost:8080?token=YOUR_JWT_TOKEN
```

**Message Types:**

Join a room:
```json
{
  "type": "join-room",
  "roomId": 123
}
```

Send a chat message:
```json
{
  "type": "chat",
  "roomId": 123,
  "message": "Hello, team!"
}
```

Leave a room:
```json
{
  "type": "leave-room",
  "roomId": 123
}
```

---

## 🎨 Design Philosophy

CollabBoard embraces a **dark-first design** with:
- Deep backgrounds (`#121212`)
- Subtle gradients (pink and blue blobs)
- High contrast for accessibility
- Smooth animations and transitions
- Glassmorphism effects on cards
- Vibrant accent colors (pink-to-purple gradients)

---

## 🤝 Contributing

We love contributions! Whether it's:
- 🐛 Bug fixes
- ✨ New features
- 📝 Documentation improvements
- 🎨 Design enhancements

Feel free to open an issue or submit a pull request. Just remember to:
1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 🐛 Known Issues

- Canvas drawing synchronization may have slight delays on slower connections
- Mobile touch events need optimization
- Some edge cases in room management

We're actively working on these! 🚧

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Made with ♡ by Manish**

- GitHub: [@rookiemaniesh](https://github.com/rookiemaniesh)
- Project Link: [CollabDraw](https://github.com/rookiemaniesh/CollabDraw)

---

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Turborepo for making monorepos bearable
- The open-source community for inspiration
- Coffee, for obvious reasons ☕

---

## 🔮 Future Plans

- [ ] Voice chat integration
- [ ] More drawing tools (shapes, text, etc.)
- [ ] Export canvas as image/PDF
- [ ] User presence indicators
- [ ] Undo/Redo functionality
- [ ] Canvas templates
- [ ] Mobile app (React Native)
- [ ] AI-powered drawing suggestions (because why not? 🤖)

---

<div align="center">

### ⭐ Star us on GitHub — it helps!

**[Report Bug](https://github.com/rookiemaniesh/CollabDraw/issues)** · **[Request Feature](https://github.com/rookiemaniesh/CollabDraw/issues)** · **[Documentation](https://github.com/rookiemaniesh/CollabDraw/wiki)**

Made with TypeScript, caffeine, and a sprinkle of chaos ✨

</div>
