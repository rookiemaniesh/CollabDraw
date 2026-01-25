# 🚀 Deploying HTTP Backend to Render

## ✅ Pre-Deployment Checklist

Your `http-backend` is now **READY** for Render deployment after the recent fixes! Here's what was updated:

### Fixed Issues:
- ✅ Dynamic PORT configuration (Render requirement)
- ✅ CORS configuration for production
- ✅ Health check endpoint at `/health`
- ✅ Global error handler
- ✅ Graceful shutdown handlers
- ✅ `.gitignore` file added
- ✅ Better logging

---

## 📋 Deployment Steps

### 1. **Push Your Code to GitHub**

Make sure your latest changes are committed and pushed:

```bash
cd c:\CODE\CollabBoard
git add .
git commit -m "Prepare http-backend for Render deployment"
git push origin main
```

### 2. **Create a New Web Service on Render**

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository: `rookiemaniesh/CollabDraw`
4. Configure the service:

   **Basic Settings:**
   - **Name**: `collabboard-http-backend` (or your choice)
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `apps/http-backend`
   - **Runtime**: `Node`
   - **Build Command**: 
     ```bash
     cd ../.. && pnpm install && cd apps/http-backend && pnpm run build
     ```
   - **Start Command**: 
     ```bash
     pnpm run start
     ```

### 3. **Set Environment Variables**

In the Render dashboard, add these environment variables:

| Key | Value | Notes |
|-----|-------|-------|
| `DATABASE_URL` | `postgresql://user:pass@host/db?sslmode=require` | Your PostgreSQL connection string |
| `JWT_SECRET` | `your-super-secret-key-here` | Generate a strong secret (min 32 chars) |
| `NODE_ENV` | `production` | Sets production mode |
| `ALLOWED_ORIGINS` | `https://your-frontend.onrender.com,https://yourdomain.com` | Comma-separated frontend URLs |

**⚠️ IMPORTANT:** 
- Do NOT use the default `'MAnish'` JWT_SECRET in production!
- Generate a secure secret: `openssl rand -base64 32`

### 4. **Database Setup**

You have two options:

#### Option A: Use Existing Neon Database
Your current `DATABASE_URL` from `.env`:
```
postgresql://neondb_owner:npg_eGu8dCrbUYi0@ep-quiet-glitter-a1ja110s.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

#### Option B: Create New Render PostgreSQL Database
1. In Render Dashboard → **"New +"** → **"PostgreSQL"**
2. Name it `collabboard-db`
3. Copy the **Internal Database URL**
4. Use this as your `DATABASE_URL` environment variable

### 5. **Run Database Migrations**

After deployment, you need to run Prisma migrations:

**Option 1: Add to Build Command**
```bash
cd ../.. && pnpm install && cd packages/database && npx prisma migrate deploy && cd ../../apps/http-backend && pnpm run build
```

**Option 2: Use Render Shell**
1. Go to your service → **Shell** tab
2. Run:
```bash
cd ../../packages/database
npx prisma migrate deploy
npx prisma generate
```

### 6. **Deploy!**

Click **"Create Web Service"** and Render will:
1. Clone your repository
2. Install dependencies
3. Build your application
4. Start the server
5. Assign a public URL like: `https://collabboard-http-backend.onrender.com`

---

## 🧪 Testing Your Deployment

### 1. Health Check
```bash
curl https://your-backend-url.onrender.com/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2026-01-24T...",
  "uptime": 123.456
}
```

### 2. Root Endpoint
```bash
curl https://your-backend-url.onrender.com/
```

Expected response:
```json
{
  "message": "CollabBoard HTTP Backend API",
  "version": "1.0.0",
  "endpoints": {
    "auth": ["/api/auth/signup", "/api/auth/signin"],
    "rooms": ["/api/room", "/api/room/:slug"],
    "chats": ["/api/chats/:roomId"]
  }
}
```

### 3. Test Signup
```bash
curl -X POST https://your-backend-url.onrender.com/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "testpassword123"
  }'
```

---

## 🔧 Troubleshooting

### Issue: Build Fails

**Problem**: Monorepo dependencies not found

**Solution**: Update build command to install from root:
```bash
cd ../.. && pnpm install && cd apps/http-backend && pnpm run build
```

### Issue: Database Connection Error

**Problem**: Can't connect to PostgreSQL

**Solutions**:
1. Verify `DATABASE_URL` includes `?sslmode=require`
2. Check database is accessible from Render's IP
3. For Neon: Ensure connection pooling is enabled

### Issue: CORS Errors

**Problem**: Frontend can't access API

**Solution**: Add your frontend URL to `ALLOWED_ORIGINS`:
```
ALLOWED_ORIGINS=https://your-frontend.onrender.com,https://yourdomain.com
```

### Issue: Port Already in Use

**Problem**: Server won't start

**Solution**: This shouldn't happen on Render as it uses dynamic ports. Check logs for actual error.

---

## 📊 Monitoring

### View Logs
1. Go to your service in Render Dashboard
2. Click **"Logs"** tab
3. Monitor for errors

### Key Log Messages
- ✅ `🚀 CollabBoard HTTP Backend is live at port XXXX`
- ✅ `📍 Environment: production`

---

## 🔐 Security Checklist

Before going live:

- [ ] Strong JWT_SECRET (min 32 characters)
- [ ] DATABASE_URL not exposed in code
- [ ] CORS configured for specific origins only
- [ ] `.env` file in `.gitignore`
- [ ] HTTPS enabled (automatic on Render)
- [ ] Rate limiting (consider adding)
- [ ] Input validation (already using Zod ✅)

---

## 🚀 Post-Deployment

### Update Frontend Configuration

In your frontend `.env.local` or environment variables:
```env
NEXT_PUBLIC_HTTP_BACKEND=https://your-backend-url.onrender.com
```

### Test End-to-End
1. Deploy frontend
2. Try signing up from frontend
3. Try signing in
4. Create a room
5. Join a room

---

## 💰 Render Free Tier Notes

- **Free tier** includes:
  - 750 hours/month (enough for 1 service 24/7)
  - Automatic HTTPS
  - Auto-deploy on git push
  
- **Limitations**:
  - Service spins down after 15 minutes of inactivity
  - First request after spin-down takes ~30 seconds
  - 512 MB RAM

- **Upgrade to Paid** ($7/month) for:
  - No spin-down
  - More RAM
  - Better performance

---

## 📝 Next Steps

1. ✅ Deploy HTTP Backend
2. ⏭️ Deploy WS Backend (WebSocket server)
3. ⏭️ Deploy Frontend
4. ⏭️ Configure environment variables across all services
5. ⏭️ Test complete flow

---

## 🆘 Need Help?

- [Render Documentation](https://render.com/docs)
- [Render Community](https://community.render.com/)
- Check your service logs in Render Dashboard

---

**Good luck with your deployment! 🎉**
