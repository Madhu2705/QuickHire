import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider, useToast } from './context/ToastContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Toasts } from './components/Toast';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import JobsPage from './pages/JobsPage';
import ProfilePage from './pages/ProfilePage';
import CandidateDashboard from './pages/CandidateDashboard';
import MyApplicationsPage from './pages/MyApplicationsPage';
import SavedJobsPage from './pages/SavedJobsPage';
import RecruiterDashboard from './pages/RecruiterDashboard';
import CompanyProfile from './pages/CompanyProfile';
import PostJobPage from './pages/PostJobPage';
import ManageJobs from './pages/ManageJobs';
import ApplicantsList from './pages/ApplicantsList';
import RecruiterAbout from './pages/RecruiterAbout';
import RecruiterContact from './pages/RecruiterContact';

const AppContent = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { toasts, removeToast } = useToast();

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar
          isMobileSidebarOpen={isMobileSidebarOpen}
          setIsMobileSidebarOpen={setIsMobileSidebarOpen}
        />

        <div className="flex-1">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/jobs" element={<JobsPage />} />

            {/* Candidate Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute requiredRole="candidate">
                  <CandidateDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-applications"
              element={
                <ProtectedRoute requiredRole="candidate">
                  <MyApplicationsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/saved-jobs"
              element={
                <ProtectedRoute requiredRole="candidate">
                  <SavedJobsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            {/* Recruiter Routes */}
            <Route
              path="/recruiter/dashboard"
              element={
                <ProtectedRoute requiredRole="recruiter">
                  <RecruiterDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/recruiter/company-profile"
              element={
                <ProtectedRoute requiredRole="recruiter">
                  <CompanyProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/recruiter/post-job"
              element={
                <ProtectedRoute requiredRole="recruiter">
                  <PostJobPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/recruiter/manage-jobs"
              element={
                <ProtectedRoute requiredRole="recruiter">
                  <ManageJobs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/recruiter/applicants"
              element={
                <ProtectedRoute requiredRole="recruiter">
                  <ApplicantsList />
                </ProtectedRoute>
              }
            />
            <Route path="/recruiter/about" element={<RecruiterAbout />} />
            <Route path="/recruiter/contact" element={<RecruiterContact />} />
          </Routes>
        </div>

        <Footer />
        <Toasts toasts={toasts} onRemove={removeToast} />
      </div>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
