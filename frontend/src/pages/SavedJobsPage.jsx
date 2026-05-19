import React, { useState, useEffect } from 'react';
import { useToast } from '../context/ToastContext';
import { userAPI, applicationAPI } from '../services/api';
import JobCard from '../components/JobCard';
import { Bookmark } from 'lucide-react';

const SavedJobsPage = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    fetchSavedJobs();
    fetchAppliedJobs();
  }, []);

  const fetchAppliedJobs = async () => {
    try {
      const response = await applicationAPI.getCandidateApplications();
      setAppliedJobs(response.data.applications?.map(app => app.jobId?._id).filter(Boolean) || []);
    } catch (error) {
      console.error('Error fetching applied jobs:', error);
    }
  };

  const fetchSavedJobs = async () => {
    setLoading(true);
    try {
      const response = await userAPI.getSavedJobs();
      setSavedJobs(response.data.savedJobs || []);
    } catch (error) {
      showToast('Error fetching saved jobs', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyJob = async (jobId) => {
    try {
      await applicationAPI.applyJob({ jobId });
      setAppliedJobs((prev) => [...new Set([...prev, jobId])]);
      showToast('Application submitted successfully', 'success');
    } catch (error) {
      showToast(error.response?.data?.message || 'Error applying for job', 'error');
    }
  };

  const handleRemove = async (jobId) => {
    try {
      await userAPI.unsaveJob(jobId);
      setSavedJobs(savedJobs.filter(job => job._id !== jobId));
      showToast('Job removed from saved', 'info');
    } catch (error) {
      showToast('Error removing job', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-bgLight py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Bookmark size={32} className="text-primary" />
            <h1 className="text-4xl font-bold text-textDark">Saved Jobs</h1>
          </div>
          <p className="text-gray-600">Jobs you've bookmarked for later</p>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-8">
          <p className="text-lg font-medium text-textDark">
            {savedJobs.length} Job{savedJobs.length !== 1 ? 's' : ''} Saved
          </p>
        </div>

        {/* Saved Jobs List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-600">Loading...</p>
              </div>
            ) : savedJobs.length > 0 ? (
              savedJobs.map((job) => (
                <div key={job._id} className="relative">
                  <JobCard
                    job={job}
                    onApply={() => handleApplyJob(job._id)}
                    onSave={() => handleRemove(job._id)}
                    isSaved={true}
                    isApplied={appliedJobs.includes(job._id)}
                  />
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 text-center">
                <Bookmark size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-textDark mb-2">No Saved Jobs</h3>
                <p className="text-gray-600 mb-4">
                  You haven't saved any jobs yet. Explore jobs and bookmark the ones you like!
                </p>
                <a
                  href="/jobs"
                  className="inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-darkBlue transition"
                >
                  Browse Jobs
                </a>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 sticky top-20">
              <h3 className="text-lg font-bold text-textDark mb-4">Tips</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>• Save jobs to review later</li>
                <li>• Compare jobs easily</li>
                <li>• Set alerts for saved jobs</li>
                <li>• Organize by category</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedJobsPage;
