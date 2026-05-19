import React, { useState, useEffect } from 'react';
import { jobAPI, userAPI, applicationAPI } from '../services/api';
import { useToast } from '../context/ToastContext';
import JobCard from '../components/JobCard';
import { SkeletonLoader } from '../components/Loader';
import { Search, Filter, X } from 'lucide-react';

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    jobType: '',
    experienceLevel: '',
    location: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const { showToast } = useToast();

  // Fetch jobs
  useEffect(() => {
    fetchJobs();
    fetchSavedJobs();
    fetchAppliedJobs();
  }, [filters]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await jobAPI.getAllJobs(filters);
      setJobs(response.data.jobs);
    } catch (error) {
      showToast('Error fetching jobs', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchSavedJobs = async () => {
    try {
      const response = await userAPI.getSavedJobs();
      setSavedJobs(response.data.savedJobs?.map(job => job._id) || []);
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
    }
  };

  const fetchAppliedJobs = async () => {
    try {
      const response = await applicationAPI.getCandidateApplications();
      setAppliedJobs(response.data.applications?.map(app => app.jobId?._id).filter(Boolean) || []);
    } catch (error) {
      console.error('Error fetching applied jobs:', error);
    }
  };

  const handleSaveJob = async (jobId) => {
    try {
      if (savedJobs.includes(jobId)) {
        await userAPI.unsaveJob(jobId);
        setSavedJobs(savedJobs.filter(id => id !== jobId));
        showToast('Job removed from saved', 'info');
      } else {
        await userAPI.saveJob(jobId);
        setSavedJobs([...savedJobs, jobId]);
        showToast('Job saved successfully', 'success');
      }
    } catch (error) {
      showToast(error.response?.data?.message || 'Error saving job', 'error');
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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      jobType: '',
      experienceLevel: '',
      location: ''
    });
  };

  return (
    <div className="min-h-screen bg-bgLight py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-textDark mb-2">Find Your Perfect Job</h1>
          <p className="text-gray-600">Explore thousands of job opportunities</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-8">
          <div className="flex gap-4 mb-4 flex-wrap">
            <div className="flex-1 min-w-xs">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-3.5 text-gray-400"
                />
                <input
                  type="text"
                  name="search"
                  placeholder="Search jobs..."
                  value={filters.search}
                  onChange={handleFilterChange}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <Filter size={18} />
              More Filters
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium text-textDark mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="City or Country"
                  value={filters.location}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-textDark mb-2">
                  Job Type
                </label>
                <select
                  name="jobType"
                  value={filters.jobType}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">All Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-textDark mb-2">
                  Experience Level
                </label>
                <select
                  name="experienceLevel"
                  value={filters.experienceLevel}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">All Levels</option>
                  <option value="Entry Level">Entry Level</option>
                  <option value="Mid Level">Mid Level</option>
                  <option value="Senior">Senior</option>
                  <option value="Lead">Lead</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                >
                  <X size={16} />
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Jobs List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {loading ? (
              <>
                <SkeletonLoader />
                <SkeletonLoader />
                <SkeletonLoader />
              </>
            ) : jobs.length > 0 ? (
              jobs.map((job) => (
                <JobCard
                  key={job._id}
                  job={job}
                  onApply={() => handleApplyJob(job._id)}
                  onSave={handleSaveJob}
                  isSaved={savedJobs.includes(job._id)}
                  isApplied={appliedJobs.includes(job._id)}
                />
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 text-center">
                <p className="text-gray-600">No jobs found. Try adjusting your filters.</p>
              </div>
            )}
          </div>

          {/* Sidebar - Stats */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 sticky top-20">
              <h3 className="text-lg font-bold text-textDark mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-600">Total Jobs</p>
                  <p className="text-2xl font-bold text-primary">{jobs.length}</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-600">Saved Jobs</p>
                  <p className="text-2xl font-bold text-green-600">{savedJobs.length}</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="text-sm text-purple-600">Applied Jobs</p>
                  <p className="text-2xl font-bold text-purple-600">{appliedJobs.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
