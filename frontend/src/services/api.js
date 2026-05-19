import axios from 'axios';

const API_BASE_URL = '/api';

// Auth API
export const authAPI = {
  register: (data) => axios.post(`${API_BASE_URL}/auth/register`, data),
  login: (data) => axios.post(`${API_BASE_URL}/auth/login`, data),
  getCurrentUser: () => axios.get(`${API_BASE_URL}/auth/me`)
};

// Job API
export const jobAPI = {
  getAllJobs: (params) => axios.get(`${API_BASE_URL}/jobs`, { params }),
  getJobById: (id) => axios.get(`${API_BASE_URL}/jobs/${id}`),
  createJob: (data) => axios.post(`${API_BASE_URL}/jobs`, data),
  updateJob: (id, data) => axios.put(`${API_BASE_URL}/jobs/${id}`, data),
  deleteJob: (id) => axios.delete(`${API_BASE_URL}/jobs/${id}`),
  getRecruiterJobs: () => axios.get(`${API_BASE_URL}/jobs/recruiter/jobs`)
};

// Application API
export const applicationAPI = {
  applyJob: (data) => axios.post(`${API_BASE_URL}/applications`, data),
  getCandidateApplications: () => axios.get(`${API_BASE_URL}/applications/candidate/applications`),
  getApplicationStatus: (jobId) => axios.get(`${API_BASE_URL}/applications/candidate/status/${jobId}`),
  getJobApplications: (jobId) => axios.get(`${API_BASE_URL}/applications/job/${jobId}`),
  updateApplicationStatus: (id, data) => axios.put(`${API_BASE_URL}/applications/${id}/status`, data),
  shortlistCandidate: (id) => axios.put(`${API_BASE_URL}/applications/${id}/shortlist`),
  rejectCandidate: (id) => axios.put(`${API_BASE_URL}/applications/${id}/reject`)
};

// User API
export const userAPI = {
  updateProfile: (data) => axios.put(`${API_BASE_URL}/users/profile`, data),
  uploadResume: (formData) => axios.post(`${API_BASE_URL}/users/resume`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getUserProfile: (userId) => axios.get(`${API_BASE_URL}/users/profile/${userId || ''}`),
  saveJob: (jobId) => axios.post(`${API_BASE_URL}/users/save-job`, { jobId }),
  unsaveJob: (jobId) => axios.delete(`${API_BASE_URL}/users/save-job/${jobId}`),
  getSavedJobs: () => axios.get(`${API_BASE_URL}/users/saved-jobs`)
};

// Recruiter API
export const recruiterAPI = {
  createCompany: (data) => axios.post(`${API_BASE_URL}/recruiter/company`, data),
  getCompany: () => axios.get(`${API_BASE_URL}/recruiter/company`),
  updateCompany: (id, data) => axios.put(`${API_BASE_URL}/recruiter/company/${id}`, data),
  getCompanyJobs: (id) => axios.get(`${API_BASE_URL}/recruiter/company/${id}/jobs`),
  getDashboard: () => axios.get(`${API_BASE_URL}/recruiter/dashboard`),
  getApplicants: () => axios.get(`${API_BASE_URL}/recruiter/applicants`)
};

export default {
  authAPI,
  jobAPI,
  applicationAPI,
  userAPI,
  recruiterAPI
};
