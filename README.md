# Smart Job Portal - MERN Stack

A full-stack MERN application that connects job seekers with employers. This platform allows candidates to search and apply for jobs, while recruiters can post jobs and manage applications.

## Features

### For Candidates:
- ✅ User registration and authentication (JWT)
- ✅ Browse and search jobs with filters
- ✅ Apply for jobs
- ✅ Track application status
- ✅ Save favorite jobs
- ✅ Update profile with skills and experience
- ✅ Upload resume (PDF)
- ✅ Dashboard with application stats

### For Recruiters:
- ✅ Company profile management
- ✅ Post new job listings
- ✅ View and manage job postings
- ✅ Review applicants
- ✅ Shortlist/Reject candidates
- ✅ Add notes to applications
- ✅ Rate candidates
- ✅ Dashboard with analytics

### General Features:
- 🎨 Modern, responsive UI with Tailwind CSS
- 🔐 Secure JWT-based authentication
- 📱 Mobile-friendly design
- 🔄 Context API for state management
- 🚀 Fast API with Express.js
- 📊 MongoDB database
- 📤 File upload support for resumes
- 🔔 Toast notifications

## Tech Stack

### Frontend:
- React 18
- Vite (bundler)
- Tailwind CSS (styling)
- React Router DOM (routing)
- Axios (HTTP client)
- Lucide React (icons)
- Context API (state management)

### Backend:
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (authentication)
- bcryptjs (password hashing)
- Multer (file upload)
- CORS (cross-origin requests)

## Project Structure

```
job_portal/
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   ├── context/          # Context API (Auth, Toast)
│   │   ├── pages/            # Page components
│   │   ├── services/         # API service calls
│   │   ├── utils/            # Utility functions and helpers
│   │   ├── hooks/            # Custom React hooks
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
└── backend/
    ├── config/               # Database configuration
    ├── models/               # Mongoose schemas
    ├── controllers/          # Route controllers
    ├── routes/               # API routes
    ├── middleware/           # Custom middleware (auth, etc)
    ├── uploads/              # Resume files storage
    ├── server.js             # Main entry point
    ├── package.json
    ├── .env
    └── .gitignore
```

## Installation & Setup

### Prerequisites:
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup:

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create .env file:**
   ```bash
   cp .env.example .env
   ```
   Update the following variables:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/job_portal
   JWT_SECRET=your_jwt_secret_key_here
   FRONTEND_URL=http://localhost:5173
   ```

4. **Start the server:**
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

### Frontend Setup:

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Jobs
- `GET /api/jobs` - Get all jobs with filters
- `GET /api/jobs/:id` - Get job details
- `POST /api/jobs` - Create job (Recruiter)
- `PUT /api/jobs/:id` - Update job (Recruiter)
- `DELETE /api/jobs/:id` - Delete job (Recruiter)

### Applications
- `POST /api/applications` - Apply for job
- `GET /api/applications/candidate/applications` - Get my applications
- `GET /api/applications/job/:jobId` - Get job applicants (Recruiter)
- `PUT /api/applications/:id/status` - Update application status

### Users
- `PUT /api/users/profile` - Update profile
- `POST /api/users/resume` - Upload resume
- `GET /api/users/profile/:userId` - Get user profile
- `POST /api/users/save-job` - Save job
- `DELETE /api/users/save-job/:jobId` - Unsave job

### Recruiter
- `POST /api/recruiter/company` - Create company
- `GET /api/recruiter/company` - Get recruiter's company
- `PUT /api/recruiter/company/:id` - Update company
- `GET /api/recruiter/dashboard` - Get dashboard data
- `GET /api/recruiter/applicants` - Get all applicants

## Database Models

### User Model
```javascript
- fullName: String
- email: String (unique)
- password: String (hashed)
- role: 'candidate' | 'recruiter'
- phone: String
- location: String
- bio: String
- skills: [String]
- resumePath: String
- savedJobs: [ObjectId]
- companyId: ObjectId (if recruiter)
```

### Job Model
```javascript
- title: String
- description: String
- requirements: [String]
- salary: { min, max, currency }
- location: String
- jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship'
- experienceLevel: String
- companyId: ObjectId
- recruiterId: ObjectId
- applicants: [ObjectId]
- status: 'active' | 'inactive' | 'closed'
```

### Application Model
```javascript
- candidateId: ObjectId
- jobId: ObjectId
- companyId: ObjectId
- status: 'applied' | 'shortlisted' | 'rejected' | 'selected'
- appliedDate: Date
- resumePath: String
- coverLetter: String
- notes: String
- rating: Number (0-5)
```

### Company Model
```javascript
- name: String
- description: String
- website: String
- email: String
- phone: String
- location: Object
- industry: String
- companySize: String
- recruiterId: ObjectId
```

## Usage

### For Candidates:
1. Sign up as a job seeker
2. Complete your profile with skills and experience
3. Upload your resume
4. Browse jobs using search and filters
5. Apply for jobs that interest you
6. Track your applications
7. Save jobs for later review

### For Recruiters:
1. Sign up as a recruiter
2. Create your company profile
3. Post job listings
4. View applications from candidates
5. Shortlist or reject candidates
6. Add notes and rate candidates
7. Manage job postings

## Component Highlights

### Navbar Component
- Responsive navigation with mobile menu
- Role-based menu items
- Profile dropdown with logout
- Authentication status display

### JobCard Component
- Display job details (title, location, salary, etc)
- Save/unsave job functionality
- Apply button with status
- Quick view of requirements

### ApplicationCard Component
- Show application details
- Display candidate info
- Update application status
- Download resume link

### Loaders & UI
- SkeletonLoaders for better UX
- Toast notifications
- Loading states
- Error handling

## Authentication Flow

1. User registers with email and password
2. Password is hashed with bcryptjs
3. JWT token is generated upon login
4. Token stored in localStorage
5. Token sent in Authorization header for protected routes
6. Token verified on backend
7. Protected routes check role-based access

## File Upload

- Resumes must be PDF files
- Max file size: 5MB
- Uploaded to `/uploads/resumes/`
- Files served statically by Express

## Error Handling

- Validation errors with user-friendly messages
- Try-catch blocks for async operations
- Toast notifications for errors
- Error boundary in React (optional)
- Detailed error responses from API

## Future Enhancements

- [ ] Email notifications
- [ ] Interview scheduling
- [ ] Rating and reviews system
- [ ] Advanced analytics
- [ ] AI-powered job recommendations
- [ ] Video resume support
- [ ] Two-factor authentication
- [ ] Social login (Google, GitHub)
- [ ] Payment integration
- [ ] Admin dashboard

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email support@jobhub.com or create an issue in the repository.

## Demo Credentials

For testing purposes:
- Candidate: candidate@example.com / password123
- Recruiter: recruiter@example.com / password123

## Performance Optimization

- Code splitting with React.lazy()
- Image optimization
- API response caching
- Debounced search
- Pagination for large datasets
- Database indexing
- CDN for static assets

## Security Features

- JWT authentication
- Password hashing with bcryptjs
- CORS protection
- XSS prevention
- SQL injection prevention (MongoDB)
- HTTPS in production
- Environment variables for sensitive data
- Input validation on both client and server
