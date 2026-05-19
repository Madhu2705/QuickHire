import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { recruiterAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Loader } from '../components/Loader';

const CompanyProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    website: '',
    email: '',
    phone: '',
    location: '',
    industry: '',
    companySize: 'Startup',
    foundedYear: ''
  });

  useEffect(() => {
    const loadCompany = async () => {
      setLoading(true);
      try {
        const response = await recruiterAPI.getCompany();
        setCompany(response.data.company);
        setFormData({
          name: response.data.company.name || '',
          description: response.data.company.description || '',
          website: response.data.company.website || '',
          email: response.data.company.email || '',
          phone: response.data.company.phone || '',
          location: typeof response.data.company.location === 'string'
            ? response.data.company.location
            : response.data.company.location?.city || '',
          industry: response.data.company.industry || '',
          companySize: response.data.company.companySize || 'Startup',
          foundedYear: response.data.company.foundedYear || ''
        });
      } catch (error) {
        if (error.response?.status !== 404) {
          showToast(error.response?.data?.message || 'Unable to load company profile', 'error');
        }
      } finally {
        setLoading(false);
      }
    };

    loadCompany();
  }, [showToast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      showToast('Company name is required', 'error');
      return;
    }

    const companyData = {
      ...formData,
      location: { city: formData.location }
    };

    setSaving(true);
    try {
      if (company) {
        await recruiterAPI.updateCompany(company._id, companyData);
        showToast('Company profile updated successfully', 'success');
      } else {
        await recruiterAPI.createCompany(formData);
        showToast('Company profile created successfully', 'success');
      }
      navigate('/recruiter/dashboard');
    } catch (error) {
      showToast(error.response?.data?.message || 'Error saving company profile', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-bgLight py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-textDark mb-2">Company Profile</h1>
          <p className="text-gray-600">
            {company
              ? 'Update your company information and make it available to job applicants.'
              : 'Create your company profile so you can post jobs and manage applicants.'}
          </p>
        </div>

        {loading ? (
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 text-center">
            <Loader />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md border border-gray-200 p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-textDark mb-2">Company Name *</label>
              <input
                type="text"
                name="name"
                placeholder="Acme Talent Solutions"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-textDark mb-2">Description</label>
              <textarea
                name="description"
                placeholder="A short description of your company"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-textDark mb-2">Website</label>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-textDark mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-textDark mb-2">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-textDark mb-2">City</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="E.g. New York"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-textDark mb-2">Industry</label>
                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-textDark mb-2">Company Size</label>
                <select
                  name="companySize"
                  value={formData.companySize}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Startup">Startup</option>
                  <option value="Small (10-50)">Small (10-50)</option>
                  <option value="Medium (50-500)">Medium (50-500)</option>
                  <option value="Large (500+)">Large (500+)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-textDark mb-2">Founded Year</label>
                <input
                  type="text"
                  name="foundedYear"
                  value={formData.foundedYear}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-primary text-white py-3 rounded-lg font-bold hover:bg-darkBlue transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {saving ? <Loader /> : company ? 'Update Company' : 'Create Company'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/recruiter/dashboard')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
              >
                Back
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CompanyProfile;
