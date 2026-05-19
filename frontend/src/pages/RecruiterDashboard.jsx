import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { recruiterAPI, applicationAPI } from '../services/api';
import ApplicationCard from '../components/ApplicationCard';
import { Users, Briefcase, FileText, TrendingUp } from 'lucide-react';

const RecruiterDashboard = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dashboardError, setDashboardError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const response = await recruiterAPI.getDashboard();
      setDashboardData(response.data.data);
      setDashboardError('');
    } catch (error) {
      if (error.response?.status === 404) {
        setDashboardError('No company profile found. Create your company profile to view the dashboard.');
      } else {
        showToast('Error loading dashboard', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (applicationId, status) => {
    try {
      setUpdatingId(applicationId);
      const updateFn = status === 'shortlisted' ? applicationAPI.shortlistCandidate : applicationAPI.rejectCandidate;
      await updateFn(applicationId);
      setDashboardData((prev) => {
        if (!prev) return prev;
        const updatedApplications = prev.recentApplications.map((application) =>
          application._id === applicationId ? { ...application, status } : application
        );
        return {
          ...prev,
          recentApplications: updatedApplications
        };
      });
      showToast(`Candidate ${status === 'shortlisted' ? 'shortlisted' : 'rejected'} successfully`, 'success');
    } catch (error) {
      console.error(`Failed to ${status} application`, error);
      showToast('Unable to update application status. Please try again.', 'error');
    } finally {
      setUpdatingId(null);
    }
  };

  if (!dashboardData && !loading) {
    return (
      <div className="min-h-screen bg-bgLight py-8">
        <div className="max-w-4xl mx-auto px-4">
          {dashboardError ? (
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 text-center">
              <h2 className="text-2xl font-bold text-textDark mb-4">{dashboardError}</h2>
              <p className="text-gray-600 mb-6">You need a company profile before posting jobs or reviewing applicants.</p>
              <a
                href="/recruiter/company-profile"
                className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-darkBlue transition"
              >
                Create Company Profile
              </a>
            </div>
          ) : (
            <div className="text-center text-gray-600">Loading...</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bgLight py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-textDark mb-2">
            Welcome, {user?.fullName}!
          </h1>
          <p className="text-gray-600">Manage your jobs and review applicants</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Jobs</p>
                <p className="text-3xl font-bold text-textDark">
                  {dashboardData?.jobsCount || 0}
                </p>
              </div>
              <Briefcase size={40} className="text-blue-100" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Applications</p>
                <p className="text-3xl font-bold text-textDark">
                  {dashboardData?.applicationsCount || 0}
                </p>
              </div>
              <FileText size={40} className="text-green-100" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Shortlisted</p>
                <p className="text-3xl font-bold text-textDark">
                  {dashboardData?.recentApplications?.filter(a => a.status === 'shortlisted').length || 0}
                </p>
              </div>
              <Users size={40} className="text-purple-100" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Company</p>
                <p className="text-lg font-bold text-textDark">
                  {dashboardData?.company?.name || 'Setup'}
                </p>
              </div>
              <TrendingUp size={40} className="text-orange-100" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-textDark mb-4">Recent Applications</h2>
            {dashboardData?.recentApplications && dashboardData.recentApplications.length > 0 ? (
              <div className="space-y-3">
                {dashboardData.recentApplications.slice(0, 5).map((app) => (
                  <ApplicationCard
                    key={app._id}
                    application={app}
                    showActions={true}
                    onUpdateStatus={handleUpdateStatus}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No applications yet</p>
            )}
          </div>

          <div className="lg:col-span-1 bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-textDark mb-4">Company Info</h3>
            {dashboardData?.company ? (
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-600">Name</p>
                  <p className="font-medium text-textDark">{dashboardData.company.name}</p>
                </div>
                <div>
                  <p className="text-gray-600">Industry</p>
                  <p className="font-medium text-textDark">{dashboardData.company.industry || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-gray-600">Location</p>
                  <p className="font-medium text-textDark">
                    {dashboardData.company.location?.city || dashboardData.company.location || 'Not specified'}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-gray-600 text-sm">No company profile. Create one to start posting jobs.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
