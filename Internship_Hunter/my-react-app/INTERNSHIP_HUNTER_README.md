# Internship Hunter Platform

A full-stack MERN application that helps students discover and apply for internship opportunities. Students can create profiles with their skills and preferences, while administrators can manage internship listings.

## 🚀 Features

### Student Features
- **User Authentication**: Secure registration and login
- **Profile Management**: Update skills, preferred domain, and location
- **Internship Discovery**: Browse and filter internships
- **Search & Filtering**: Filter by domain, location, and keywords
- **Apply to Internships**: Direct links to application pages

### Admin Features
- **Internship Management**: Create, read, update, delete internships
- **Bulk Operations**: Manage multiple internship listings
- **Filter & Search**: Quickly find internships for editing

### Technical Features
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Professional UI**: Clean and modern interface
- **Secure Authentication**: Password hashing with bcryptjs
- **Session Management**: Secure user sessions with express-session
- **RESTful API**: Clean and organized backend API

## 📁 Project Structure

```
my-react-app/
├── backend/
│   ├── models/
│   │   ├── Student.js
│   │   └── Internship.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── internshipRoutes.js
│   ├── db/
│   │   └── config.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── StudentSignUp.js
│   │   ├── StudentLogin.js
│   │   ├── StudentProfile.js
│   │   ├── AdminPanel.js
│   │   ├── Internships.js
│   │   ├── InternshipDetails.js
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   ├── App.js
│   │   └── CSS files
│   ├── package.json
│   └── public/
└── README.md
```

## 🛠️ Tech Stack

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: ODM for MongoDB
- **bcryptjs**: Password hashing
- **express-session**: Session management
- **CORS**: Cross-origin resource sharing

### Frontend
- **React.js**: UI library
- **React Router**: Client-side routing
- **Axios**: HTTP client
- **CSS3**: Styling with responsive design

## 📋 Prerequisites

Before you begin, ensure you have installed:
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)

## 🚀 Installation & Setup

### 1. Clone or Extract the Project

```bash
cd my-react-app
```

### 2. Backend Setup

#### Install Dependencies
```bash
cd backend
npm install
```

#### Configure Environment Variables

Create or update `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/internship-hunter
SESSION_SECRET=your-secret-key-change-this
NODE_ENV=development
```

For MongoDB Atlas (Cloud):
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/internship-hunter?retryWrites=true&w=majority
```

#### Start MongoDB

**Local MongoDB:**
```bash
mongod
```

**Or use MongoDB Atlas** - Get your connection string from your MongoDB Atlas cluster.

#### Start Backend Server
```bash
npm start
```

The backend server will run on `http://localhost:5000`

### 3. Frontend Setup

#### Install Dependencies
```bash
cd frontend
npm install
```

#### Start Frontend Development Server
```bash
npm start
```

The frontend will open at `http://localhost:3000`

## 🗄️ Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  collegeName: String,
  skills: [String],
  preferredDomain: String,
  preferredLocation: String,
  resumeLink: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Internships Collection
```javascript
{
  _id: ObjectId,
  companyName: String,
  role: String,
  domain: String,
  requiredSkills: [String],
  location: String,
  stipend: String,
  duration: String,
  applyLink: String,
  description: String,
  companyLogo: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 📚 API Endpoints

### Authentication Routes
- `POST /api/auth/signup` - Register a new student
- `POST /api/auth/login` - Login a student
- `POST /api/auth/logout` - Logout a student
- `GET /api/auth/profile/:studentId` - Get student profile
- `PUT /api/auth/profile/:studentId` - Update student profile

### Internship Routes
- `GET /api/internships` - Get all internships (with filtering)
- `GET /api/internships/:id` - Get single internship
- `POST /api/internships` - Create internship (Admin)
- `PUT /api/internships/:id` - Update internship (Admin)
- `DELETE /api/internships/:id` - Delete internship (Admin)

### Query Parameters for Filtering
```
/api/internships?domain=Frontend%20Development&location=Bangalore&search=React
```

## 🎨 Styling Features

- **Gradient Backgrounds**: Modern purple gradient theme
- **Responsive Cards**: Grid layout that adapts to screen size
- **Smooth Animations**: Hover effects and transitions
- **Professional Color Scheme**: Blue/Purple primary colors
- **Mobile Optimization**: Fully responsive on all devices

## 🔐 Security Features

- **Password Hashing**: bcryptjs for secure password storage
- **Session Management**: Express-session for user sessions
- **CORS**: Configured to allow frontend requests
- **Input Validation**: Server-side validation for all inputs

## 📝 Available Internship Domains

1. Frontend Development
2. Backend Development
3. MERN Stack
4. Python Development
5. Data Science
6. Artificial Intelligence
7. UI/UX Design

## 🧪 Testing the Application

### 1. Create a Student Account
- Go to `http://localhost:3000/signup`
- Fill in the registration form
- Submit to create an account

### 2. Login
- Go to `http://localhost:3000/login`
- Enter your credentials
- Access your profile page

### 3. Complete Your Profile
- Update skills and preferences
- Add resume link (optional)

### 4. Browse Internships
- Go to home page
- Search and filter internships
- Click on internships to view details

### 5. Admin Panel (Optional)
- Go to `http://localhost:3000/admin`
- Add, edit, or delete internships
- Manage all listings

## 🚀 Deployment

### Frontend Deployment (Vercel)
1. Build the frontend: `npm run build`
2. Deploy to Vercel using their CLI
3. Update API base URL in axios calls

### Backend Deployment (Heroku)
1. Create a Heroku account
2. Use Procfile: `web: node server.js`
3. Set environment variables in Heroku
4. Deploy using Heroku CLI

### Database (MongoDB Atlas)
1. Create a cluster on MongoDB Atlas
2. Get connection string
3. Update MONGODB_URI in .env

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally or use MongoDB Atlas
- Check your connection string in .env

### CORS Error
- Backend CORS is configured for localhost:3000
- Update CORS settings in server.js if needed

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9  # macOS/Linux
netstat -ano | findstr :5000   # Windows
```

### Module Not Found
- Run `npm install` in both backend and frontend directories
- Clear node_modules if needed: `rm -rf node_modules && npm install`

## 📞 Support

For issues or questions:
1. Check the console for error messages
2. Verify all environment variables are set correctly
3. Ensure all dependencies are installed
4. Check database connection

## 📄 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Feel free to submit issues, fork the repository, and create pull requests for any improvements.

---

**Happy Internship Hunting! 🎉**
