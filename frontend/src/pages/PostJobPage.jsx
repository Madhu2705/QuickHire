import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { jobAPI, recruiterAPI } from '../services/api';
import { Loader } from '../components/Loader';
import { ArrowRight } from 'lucide-react';

const PostJobPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState(null);
  const [companyError, setCompanyError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    salaryMin: '',
    salaryMax: '',
    location: '',
    jobType: 'Full-time',
    experienceLevel: 'Mid Level',
    category: 'Technology'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    const loadCompany = async () => {
      try {
        const companyRes = await recruiterAPI.getCompany();
        setCompany(companyRes.data.company);
        setCompanyError('');
      } catch (error) {
        if (error.response?.status === 404) {
          setCompanyError('No company profile found. Please create your company profile first.');
        } else {
          setCompanyError('Unable to load company information.');
        }
      }
    };

    loadCompany();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.location) {
      showToast('Please fill all required fields', 'error');
      return;
    }

    if (!company) {
      showToast('You must create a company profile before posting a job.', 'error');
      return;
    }

    setLoading(true);
    try {
      const jobData = {
        title: formData.title,
        description: formData.description,
        requirements: formData.requirements.split('\n').filter(r => r.trim()),
        salary: {
          min: formData.salaryMin ? parseInt(formData.salaryMin) : 0,
          max: formData.salaryMax ? parseInt(formData.salaryMax) : 0,
          currency: 'USD'
        },
        location: formData.location,
        jobType: formData.jobType,
        experienceLevel: formData.experienceLevel,
        category: formData.category,
        companyId: company._id
      };

      await jobAPI.createJob(jobData);
      showToast('Job posted successfully!', 'success');
      navigate('/recruiter/manage-jobs');
    } catch (error) {
      showToast(error.response?.data?.message || 'Error posting job', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bgLight py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-textDark mb-2">Post a New Job</h1>
          <p className="text-gray-600">Fill in the details below to post a job opening</p>
        </div>

        {companyError && (
          <div className="mb-6 p-4 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-800">
            <p>{companyError}</p>
            <p className="mt-2">
              <Link to="/recruiter/company-profile" className="font-semibold text-primary underline">
                Create your company profile now
              </Link>
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md border border-gray-200 p-8 space-y-6">
          {/* Job Title */}
          <div>
            <label className="block text-sm font-medium text-textDark mb-2">Job Title *</label>
            <input
              type="text"
              name="title"
              placeholder="Senior React Developer"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {/* Job Description */}
          <div>
            <label className="block text-sm font-medium text-textDark mb-2">Job Description *</label>
            <textarea
              name="description"
              placeholder="Describe the job role, responsibilities, and expectations..."
              value={formData.description}
              onChange={handleChange}
              rows="6"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-sm font-medium text-textDark mb-2">
              Requirements (one per line)
            </label>
            <textarea
              name="requirements"
              placeholder="React&#10;TypeScript&#10;Node.js&#10;MongoDB"
              value={formData.requirements}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
            />
          </div>

          {/* Salary and Location */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-textDark mb-2">Min Salary</label>
              <input
                type="number"
                name="salaryMin"
                placeholder="50000"
                value={formData.salaryMin}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-textDark mb-2">Max Salary</label>
              <input
                type="number"
                name="salaryMax"
                placeholder="100000"
                value={formData.salaryMax}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-textDark mb-2">Job Type</label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-textDark mb-2">Location *</label>
              <input
                type="text"
                name="location"
                placeholder="New York, USA"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>

          {/* Experience & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-textDark mb-2">Experience Level</label>
              <select
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Entry Level">Entry Level</option>
                <option value="Mid Level">Mid Level</option>
                <option value="Senior">Senior</option>
                <option value="Lead">Lead</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-textDark mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Technology">Technology</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
                <option value="Design">Design</option>
                <option value="Finance">Finance</option>
                <option value="HR">HR</option>
              </select>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={loading || !company}
              className="flex-1 bg-primary text-white py-3 rounded-lg font-bold hover:bg-darkBlue transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader />
                  Posting...
                </>
              ) : (
                <>
                  Post Job <ArrowRight size={18} />
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate('/recruiter/dashboard')}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJobPage;
