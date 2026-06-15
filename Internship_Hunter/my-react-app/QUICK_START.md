# ⚡ Quick Start - 5 Minutes Setup

Get the Internship Hunter Platform running in just 5 minutes!

---

## 📋 Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js installed (v14+)
- ✅ MongoDB installed locally OR MongoDB Atlas account
- ✅ npm or yarn package manager

---

## 🚀 5-Minute Setup

### Step 1: Start MongoDB (1 min)

**Option A - Local MongoDB:**
```bash
mongod
```

**Option B - MongoDB Atlas:**
- Go to https://www.mongodb.com/cloud/atlas
- Create account and cluster
- Get connection string
- (We'll use this in Step 3)

### Step 2: Backend Setup (2 min)

```bash
# Navigate to backend
cd my-react-app/backend

# Install dependencies
npm install

# Start server
npm start
```

✅ You should see:
```
Server is running on port 5000
MongoDB connected successfully
```

### Step 3: Frontend Setup (2 min)

**In a new terminal:**

```bash
# Navigate to frontend
cd my-react-app/frontend

# Install dependencies
npm install

# Start app
npm start
```

✅ App opens automatically at `http://localhost:3000`

---

## ✨ First Steps in the App

### 1. Create Account
- Click "Signup" in navbar
- Fill form: Name, Email, College, Password
- Click "Sign Up"

### 2. Complete Profile
- Add a skill (e.g., "React")
- Select domain (e.g., "Frontend Development")
- Enter location (e.g., "Bangalore")
- Click "Save Profile"

### 3. Browse Internships
- Go to Home
- Search or filter internships
- Click on internship to view details

### 4. (Admin) Add Internship
- Go to `/admin`
- Click "+ Add New Internship"
- Fill form with internship details
- Click "Create Internship"

---

## ⚙️ Environment Setup (Optional)

Edit `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/internship-hunter
SESSION_SECRET=your-secret-key
NODE_ENV=development
```

For MongoDB Atlas, replace MONGODB_URI:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/internship-hunter?retryWrites=true&w=majority
```

---

## 🎯 Key URLs

| URL | Purpose |
|-----|---------|
| http://localhost:3000 | Home / Internships |
| http://localhost:3000/signup | Register |
| http://localhost:3000/login | Login |
| http://localhost:3000/profile | My Profile |
| http://localhost:3000/admin | Admin Panel |
| http://localhost:5000/api/health | Backend Status |

---

## 🐛 Troubleshooting

### "MongoDB connection error"
```bash
# Start MongoDB in separate terminal
mongod
```

### "Port 5000 already in use"
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9  # macOS/Linux

# Windows - use Task Manager or:
netstat -ano | findstr :5000
```

### "Cannot find module"
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### "API calls failing"
- Check backend is running: http://localhost:5000/api/health
- Check frontend URL in axios calls
- Check CORS settings in backend

---

## 📚 Full Documentation

- **Main README**: `INTERNSHIP_HUNTER_README.md`
- **Setup Guide**: `IMPLEMENTATION_GUIDE.md`
- **Transformation Details**: `TRANSFORMATION_SUMMARY.md`

---

## 🎉 You're All Set!

Your Internship Hunter Platform is now running. Start exploring and enjoying!

**Need help?** Check the troubleshooting section or full documentation files.

---

## 🔐 Important Security Notes

For **PRODUCTION DEPLOYMENT**, remember to:

1. Change `SESSION_SECRET` in `.env` to a strong random value
2. Use MongoDB Atlas instead of local MongoDB
3. Set `NODE_ENV=production`
4. Use HTTPS
5. Add admin authentication middleware
6. Never commit `.env` file

---

**Happy Internship Hunting! 🚀**
