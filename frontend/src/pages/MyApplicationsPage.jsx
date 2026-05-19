import React, { useState, useEffect } from 'react';
import { useToast } from '../context/ToastContext';
import { applicationAPI } from '../services/api';
import ApplicationCard from '../components/ApplicationCard';
import { Filter, CheckCircle, Clock, XCircle } from 'lucide-react';

const MyApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const { showToast } = useToast();

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredApplications(applications);
    } else {
      setFilteredApplications(applications.filter(app => app.status === filter));
    }
  }, [filter, applications]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await applicationAPI.getCandidateApplications();
      setApplications(response.data.applications || []);
    } catch (error) {
      showToast('Error fetching applications', 'error');
    } finally {
      setLoading(false);
    }
  };

  const filterOptions = [
    { value: 'all', label: 'All', icon: null },
    { value: 'applied', label: 'Applied', icon: Clock },
    { value: 'shortlisted', label: 'Shortlisted', icon: CheckCircle },
    { value: 'rejected', label: 'Rejected', icon: XCircle }
  ];

  return (
    <div className="min-h-screen bg-bgLight py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-textDark mb-2">My Applications</h1>
          <p className="text-gray-600">Track and manage your job applications</p>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-8">
          <div className="flex flex-wrap gap-4">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  filter === option.value
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {option.icon && <option.icon size={18} />}
                <span>{option.label}</span>
                <span className="ml-2 text-sm font-medium">
                  ({applications.filter(app => option.value === 'all' || app.status === option.value).length})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Loading applications...</p>
            </div>
          ) : filteredApplications.length > 0 ? (
            filteredApplications.map((application) => (
              <ApplicationCard
                key={application._id}
                application={application}
                showActions={false}
              />
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 text-center">
              <p className="text-gray-600 mb-4">No applications in this category</p>
              <button
                onClick={() => setFilter('all')}
                className="text-primary font-medium hover:underline"
              >
                View all applications
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyApplicationsPage;
