import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { applicationAPI, userAPI } from '../services/api';
import { Briefcase, FileText, CheckCircle, Clock } from 'lucide-react';

const CandidateDashboard = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [applications, setApplications] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [appRes, savedRes] = await Promise.all([
        applicationAPI.getCandidateApplications(),
        userAPI.getSavedJobs()
      ]);
      setApplications(appRes.data.applications || []);
      setSavedJobs(savedRes.data.savedJobs || []);
    } catch (error) {
      showToast('Error loading dashboard', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Count applications by status
  const stats = {
    total: applications.length,
    applied: applications.filter(a => a.status === 'applied').length,
    shortlisted: applications.filter(a => a.status === 'shortlisted').length,
    rejected: applications.filter(a => a.status === 'rejected').length
  };

  return (
    <div className="min-h-screen bg-bgLight py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-textDark mb-2">
            Welcome, {user?.fullName}!
          </h1>
          <p className="text-gray-600">Here's your job search overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Applications</p>
                <p className="text-3xl font-bold text-textDark">{stats.total}</p>
              </div>
              <Briefcase size={40} className="text-blue-100" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending</p>
                <p className="text-3xl font-bold text-textDark">{stats.applied}</p>
              </div>
              <Clock size={40} className="text-yellow-100" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Shortlisted</p>
                <p className="text-3xl font-bold text-textDark">{stats.shortlisted}</p>
              </div>
              <CheckCircle size={40} className="text-green-100" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Saved Jobs</p>
                <p className="text-3xl font-bold text-textDark">{savedJobs.length}</p>
              </div>
              <FileText size={40} className="text-purple-100" />
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-textDark mb-4">Recent Applications</h2>
              {loading ? (
                <p className="text-gray-600">Loading...</p>
              ) : applications.length > 0 ? (
                <div className="space-y-3">
                  {applications.slice(0, 5).map((app) => (
                    <div key={app._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-textDark">{app.jobId?.title}</p>
                        <p className="text-sm text-gray-600">{app.companyId?.name}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                        app.status === 'applied' ? 'bg-blue-500' :
                        app.status === 'shortlisted' ? 'bg-green-500' :
                        'bg-red-500'
                      }`}>
                        {app.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No applications yet. Start applying for jobs!</p>
              )}
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-textDark mb-4">Quick Tips</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>✓ Complete your profile to increase visibility</li>
                <li>✓ Upload a professional resume</li>
                <li>✓ Apply for jobs matching your skills</li>
                <li>✓ Check application status regularly</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;
