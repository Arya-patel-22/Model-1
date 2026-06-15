# 🏗️ System Architecture & Data Flow

Complete architecture overview and data flow diagrams for the Internship Hunter Platform.

---

## 🏛️ Overall Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     INTERNSHIP HUNTER PLATFORM                   │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────┐         ┌──────────────────┐     ┌──────────────┐
│   WEB BROWSER    │         │   Mobile Browser │     │  API Client  │
│  (React App)     │         │   (React App)    │     │  (Tools)     │
└────────┬─────────┘         └────────┬─────────┘     └────────┬─────┘
         │                            │                        │
         │ HTTP Requests/Responses    │ HTTP                   │
         │ (Axios)                    │ Requests/Responses     │
         └────────────────┬───────────┘                        │
                          │                                     │
                    ┌─────▼──────────────────────────────┐
                    │     FRONTEND (React.js)            │
                    │  ┌────────────────────────────┐    │
                    │  │  React Components           │    │
                    │  │  - StudentSignUp           │    │
                    │  │  - StudentLogin            │    │
                    │  │  - StudentProfile          │    │
                    │  │  - Internships             │    │
                    │  │  - InternshipDetails       │    │
                    │  │  - AdminPanel              │    │
                    │  └────────────────────────────┘    │
                    │  ┌────────────────────────────┐    │
                    │  │  React Router (Client-side)│    │
                    │  │  - / (Home)                │    │
                    │  │  - /signup                 │    │
                    │  │  - /login                  │    │
                    │  │  - /profile                │    │
                    │  │  - /internship/:id         │    │
                    │  │  - /admin                  │    │
                    │  └────────────────────────────┘    │
                    │  ┌────────────────────────────┐    │
                    │  │  Local Storage (Client)    │    │
                    │  │  - studentId               │    │
                    │  │  - studentEmail            │    │
                    │  │  - studentName             │    │
                    │  └────────────────────────────┘    │
                    └─────┬──────────────────────────────┘
                          │
                          │ REST API Calls
                          │ (http://localhost:5000)
                          │
                    ┌─────▼──────────────────────────────────────┐
                    │     BACKEND (Node.js + Express)            │
                    │  ┌────────────────────────────────────┐    │
                    │  │  Express Routes                    │    │
                    │  │  ┌──────────────────────────────┐  │    │
                    │  │  │ /api/auth                    │  │    │
                    │  │  │ - POST /signup              │  │    │
                    │  │  │ - POST /login               │  │    │
                    │  │  │ - POST /logout              │  │    │
                    │  │  │ - GET /profile/:id          │  │    │
                    │  │  │ - PUT /profile/:id          │  │    │
                    │  │  └──────────────────────────────┘  │    │
                    │  │  ┌──────────────────────────────┐  │    │
                    │  │  │ /api/internships             │  │    │
                    │  │  │ - GET /                      │  │    │
                    │  │  │ - GET /:id                   │  │    │
                    │  │  │ - POST /                     │  │    │
                    │  │  │ - PUT /:id                   │  │    │
                    │  │  │ - DELETE /:id                │  │    │
                    │  │  └──────────────────────────────┘  │    │
                    │  └────────────────────────────────────┘    │
                    │  ┌────────────────────────────────────┐    │
                    │  │  Mongoose Models                   │    │
                    │  │  - Student                        │    │
                    │  │  - Internship                     │    │
                    │  └────────────────────────────────────┘    │
                    │  ┌────────────────────────────────────┐    │
                    │  │  Middleware                       │    │
                    │  │  - CORS                           │    │
                    │  │  - Session Management             │    │
                    │  │  - Error Handling                 │    │
                    │  └────────────────────────────────────┘    │
                    └─────┬──────────────────────────────────────┘
                          │
                          │ Database Queries
                          │ (Mongoose)
                          │
                    ┌─────▼──────────────────────────────┐
                    │     DATABASE (MongoDB)             │
                    │  ┌────────────────────────────┐    │
                    │  │  Students Collection       │    │
                    │  │  - name                    │    │
                    │  │  - email                   │    │
                    │  │  - password (hashed)       │    │
                    │  │  - skills                  │    │
                    │  │  - preferredDomain         │    │
                    │  │  - preferredLocation       │    │
                    │  └────────────────────────────┘    │
                    │  ┌────────────────────────────┐    │
                    │  │  Internships Collection    │    │
                    │  │  - companyName             │    │
                    │  │  - role                    │    │
                    │  │  - domain                  │    │
                    │  │  - requiredSkills          │    │
                    │  │  - location                │    │
                    │  │  - stipend                 │    │
                    │  │  - duration                │    │
                    │  │  - applyLink               │    │
                    │  └────────────────────────────┘    │
                    └────────────────────────────────────┘
```

---

## 🔄 User Registration Flow

```
┌─────────────────┐
│  Student Opens  │
│   App in Browser│
└────────┬────────┘
         │
         ▼
┌─────────────────────────┐
│ Click "Sign Up" Button  │
└────────┬────────────────┘
         │
         ▼
┌───────────────────────────────────────────────────┐
│  StudentSignUp Component Loads                    │
│  - Displays registration form                    │
│  - Fields: name, email, college, password        │
└────────┬──────────────────────────────────────────┘
         │
         ▼ (User fills form & clicks "Sign Up")
┌───────────────────────────────────────────────────┐
│  Frontend: axios.post('/api/auth/signup')        │
│  - Sends registration data                       │
└────────┬──────────────────────────────────────────┘
         │
         ▼ (HTTP Request)
┌───────────────────────────────────────────────────┐
│  Backend: authRoutes.post('/signup')             │
│  1. Validate email format                        │
│  2. Check if email exists in DB                  │
│  3. Hash password using bcryptjs                 │
│  4. Create new Student document                  │
│  5. Save to MongoDB                              │
└────────┬──────────────────────────────────────────┘
         │
         ▼ (HTTP Response with studentId)
┌───────────────────────────────────────────────────┐
│  Frontend: Receive Response                      │
│  1. Store studentId in localStorage              │
│  2. Redirect to /profile page                    │
└────────┬──────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────┐
│ Profile Page Loads      │
│ - Ready to complete     │
│   profile               │
└─────────────────────────┘
```

---

## 🔐 User Login Flow

```
┌──────────────────┐
│ Click "Login"    │
│ Button/Link      │
└────────┬─────────┘
         │
         ▼
┌────────────────────────────────────┐
│ StudentLogin Component Loads       │
│ - Email & Password input fields    │
└────────┬───────────────────────────┘
         │
         ▼ (User enters credentials & clicks "Log In")
┌────────────────────────────────────────────────────┐
│ Frontend: axios.post('/api/auth/login')           │
│ - Sends email & password                          │
└────────┬───────────────────────────────────────────┘
         │
         ▼ (HTTP Request)
┌────────────────────────────────────────────────────┐
│ Backend: authRoutes.post('/login')                │
│ 1. Find student by email in MongoDB              │
│ 2. Compare password hash (bcryptjs)              │
│ 3. If invalid → return error                     │
│ 4. If valid → create session                     │
│ 5. Return student data                           │
└────────┬───────────────────────────────────────────┘
         │
         ▼ (HTTP Response with student data)
┌────────────────────────────────────────────────────┐
│ Frontend: Store in localStorage                   │
│ - studentId                                       │
│ - studentEmail                                    │
│ - studentName                                     │
│ - Redirect to /profile                           │
└────────┬───────────────────────────────────────────┘
         │
         ▼
┌──────────────────────┐
│ Profile Page Loads   │
│ - Display profile    │
│   with stored data   │
└──────────────────────┘
```

---

## 🔍 Internship Discovery & Search Flow

```
┌──────────────────────┐
│ User Views Home Page │
└────────┬─────────────┘
         │
         ▼
┌──────────────────────────────────────────────────┐
│ Internships Component Loads                      │
│ - Fetch all internships on mount                │
└────────┬───────────────────────────────────────────┘
         │
         ▼ (HTTP GET Request)
┌──────────────────────────────────────────────────┐
│ Backend: internshipRoutes.get('/')              │
│ 1. Query MongoDB for all internships            │
│ 2. Return sorted by creation date               │
└────────┬───────────────────────────────────────────┘
         │
         ▼ (HTTP Response with array of internships)
┌──────────────────────────────────────────────────┐
│ Frontend: Display Internships                    │
│ 1. Render grid of internship cards              │
│ 2. Show company, role, domain, location         │
└────────┬───────────────────────────────────────────┘
         │
         ├─ User searches keyword
         │  └─ Filter internships by company/role
         │
         ├─ User selects domain filter
         │  └─ Filter by domain (Frontend, Backend, etc.)
         │
         └─ User enters location filter
            └─ Filter by location

         ▼ (User clicks on an internship card)
┌──────────────────────────────────────────────────┐
│ Frontend: Navigate to /internship/:id            │
│ - axios.get('/api/internships/:id')              │
└────────┬───────────────────────────────────────────┘
         │
         ▼ (Backend returns internship details)
┌──────────────────────────────────────────────────┐
│ InternshipDetails Component Shows:               │
│ - Company name & role                            │
│ - Required skills                                │
│ - Location, duration, stipend                    │
│ - "Apply Now" button                             │
└────────┬───────────────────────────────────────────┘
         │
         ▼ (User clicks "Apply Now")
┌──────────────────────────────────────────────────┐
│ Redirect to company's application link           │
│ (External website)                               │
└──────────────────────────────────────────────────┘
```

---

## 👨‍💼 Admin Internship Management Flow

```
┌─────────────────────┐
│ Admin Goes to /admin │
└────────┬────────────┘
         │
         ▼
┌──────────────────────────────────────────────────┐
│ AdminPanel Component Loads                       │
│ - Fetches all internships from backend           │
│ - Displays table of all internships              │
└────────┬───────────────────────────────────────────┘
         │
         ├─ Admin clicks "+ Add New Internship"
         │  │
         │  ▼
         │  ┌─────────────────────────────────────┐
         │  │ Form appears                        │
         │  │ - Company, Role, Domain, Skills    │
         │  │ - Location, Duration, Stipend      │
         │  │ - Description, Logo, Apply Link    │
         │  └────────┬────────────────────────────┘
         │           │
         │           ▼ (Admin fills form & clicks "Create")
         │  ┌────────────────────────────────────────┐
         │  │ axios.post('/api/internships')        │
         │  └────────┬───────────────────────────────┘
         │           │
         │           ▼ (Backend creates in MongoDB)
         │  ┌────────────────────────────────────────┐
         │  │ Table refreshes with new internship    │
         │  └────────────────────────────────────────┘
         │
         ├─ Admin clicks "Edit" on an internship
         │  │
         │  ▼
         │  ┌─────────────────────────────────────┐
         │  │ Form pre-fills with internship data │
         │  │ Admin updates fields                │
         │  └────────┬────────────────────────────┘
         │           │
         │           ▼ (Admin clicks "Update")
         │  ┌────────────────────────────────────────┐
         │  │ axios.put('/api/internships/:id')     │
         │  └────────┬───────────────────────────────┘
         │           │
         │           ▼ (Backend updates in MongoDB)
         │  ┌────────────────────────────────────────┐
         │  │ Table refreshes with updated data      │
         │  └────────────────────────────────────────┘
         │
         └─ Admin clicks "Delete" on an internship
            │
            ▼
         ┌─────────────────────────────────────┐
         │ Confirmation dialog appears         │
         │ "Are you sure?"                     │
         └────────┬────────────────────────────┘
                  │
                  ▼ (Admin confirms)
         ┌────────────────────────────────────────┐
         │ axios.delete('/api/internships/:id')   │
         └────────┬───────────────────────────────┘
                  │
                  ▼ (Backend deletes from MongoDB)
         ┌────────────────────────────────────────┐
         │ Table refreshes without deleted item   │
         └────────────────────────────────────────┘
```

---

## 🗄️ Database Query Examples

### Creating a Student
```javascript
POST /api/auth/signup
{
  name: "John Doe",
  email: "john@example.com",
  password: "hashedPassword123",
  collegeName: "IIT Bombay"
}

// Stored in MongoDB:
{
  _id: ObjectId("..."),
  name: "John Doe",
  email: "john@example.com",
  password: "$2a$10$...", // bcrypt hash
  collegeName: "IIT Bombay",
  skills: [],
  preferredDomain: "",
  preferredLocation: "",
  resumeLink: "",
  createdAt: 2026-06-13T...,
  updatedAt: 2026-06-13T...
}
```

### Querying Internships with Filters
```javascript
// Query: Find Frontend internships in Bangalore
GET /api/internships?domain=Frontend%20Development&location=Bangalore

// MongoDB Query:
db.internships.find({
  domain: "Frontend Development",
  location: /bangalore/i
})

// Result:
[
  {
    _id: ObjectId("..."),
    companyName: "Tech Corp",
    role: "React Developer",
    domain: "Frontend Development",
    location: "Bangalore",
    ...
  },
  {
    _id: ObjectId("..."),
    companyName: "WebDev Inc",
    role: "Frontend Engineer",
    domain: "Frontend Development",
    location: "Bangalore",
    ...
  }
]
```

---

## 🔗 API Response Flow

### Successful Request
```
Browser Request
    ▼
Express Server
    ▼
Route Handler
    ▼
Mongoose Query
    ▼
MongoDB
    ▼
Mongoose Returns Data
    ▼
Route Handler Formats Response
    ▼
Express Sends HTTP 200
    ▼
Browser Receives JSON
    ▼
React Updates State
    ▼
Component Re-renders
```

### Error Handling
```
Browser Request
    ▼
Express Server
    ▼
Route Handler
    ▼
Validation Fails / DB Error / etc.
    ▼
Error Caught
    ▼
Error Handler Middleware
    ▼
Express Sends HTTP 400/500
    ▼
Browser Receives Error Message
    ▼
React Shows Error to User
```

---

## 🔐 Session & Authentication Flow

```
┌─────────────────────────────────────────────────┐
│ User Logs In                                    │
└────────┬────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────┐
│ Backend: Create Session                         │
│ - Generate session ID                           │
│ - Store studentId in session                    │
│ - Set session cookie in response                │
└────────┬────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────┐
│ Browser: Receives Cookie                        │
│ - Automatically stores cookie                   │
└────────┬────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────┐
│ Frontend: Store Data in localStorage            │
│ - studentId                                     │
│ - studentEmail                                  │
│ - studentName                                   │
└────────┬────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────┐
│ Future Requests                                 │
│ - Browser auto-sends session cookie             │
│ - Backend validates session                     │
│ - Allows authenticated operations               │
└─────────────────────────────────────────────────┘
```

---

## 📊 Component Dependency Graph

```
App.js
  ├── Header.js
  │   └── Links to all pages
  ├── BrowserRouter
  │   ├── Route: / → Internships.js
  │   │            └── Uses: axios, state management
  │   │
  │   ├── Route: /internship/:id → InternshipDetails.js
  │   │                           └── Uses: useParams, axios
  │   │
  │   ├── Route: /signup → StudentSignUp.js
  │   │                   └── Uses: axios, useNavigate
  │   │
  │   ├── Route: /login → StudentLogin.js
  │   │                  └── Uses: axios, localStorage
  │   │
  │   ├── Route: /profile → StudentProfile.js
  │   │                    └── Uses: axios, useEffect, state
  │   │
  │   ├── Route: /admin → AdminPanel.js
  │   │                  └── Uses: axios, state, events
  │   │
  │   └── Route: /about → About.js
  │
  └── Footer.js
```

---

## 🚀 Deployment Architecture

```
┌────────────────────────────────────────────────────┐
│ Production Environment                            │
└────────────────────────────────────────────────────┘

┌───────────────────────┐    ┌──────────────────────┐
│ Vercel / Netlify      │    │ Heroku / AWS / Azure │
│ (Frontend Hosting)    │    │ (Backend Hosting)    │
│                       │    │                      │
│ - React App (built)   │    │ - Node.js Server     │
│ - Static files served │    │ - Express API        │
│ - CDN distribution    │    │ - Environment config │
└───────────┬───────────┘    └──────────┬───────────┘
            │                           │
            └──────────────┬────────────┘
                           │
                    ┌──────▼──────────┐
                    │ MongoDB Atlas   │
                    │ (Cloud DB)      │
                    │                 │
                    │ - Hosted DB     │
                    │ - Backups       │
                    │ - Security      │
                    └─────────────────┘
```

---

## ✅ Architecture Complete

This architecture ensures:
- ✅ Clean separation of concerns
- ✅ Scalable and maintainable code
- ✅ Secure authentication
- ✅ Efficient data flow
- ✅ Responsive user experience
- ✅ Production-ready deployment

---

*Last Updated: 2026-06-13*
