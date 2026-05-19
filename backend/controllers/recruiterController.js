import Company from '../models/Company.js';
import Job from '../models/Job.js';
import Application from '../models/Application.js';
import User from '../models/User.js';

// Create company (Recruiter only)
export const createCompany = async (req, res) => {
  try {
    const { name, description, website, email, phone, location, industry, companySize, foundedYear } = req.body;

    if (!name) {
      return res.status(400).json({ 
        success: false, 
        message: 'Company name is required' 
      });
    }

    // Check if company already exists
    const existingCompany = await Company.findOne({ name });
    if (existingCompany) {
      return res.status(400).json({ 
        success: false, 
        message: 'Company with this name already exists' 
      });
    }

    const company = new Company({
      name,
      description,
      website,
      email,
      phone,
      location,
      industry,
      companySize,
      foundedYear,
      recruiterId: req.userId
    });

    await company.save();

    // Update user with company ID
    await User.findByIdAndUpdate(req.userId, { companyId: company._id });

    res.status(201).json({
      success: true,
      message: 'Company created successfully',
      company
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Error creating company' 
    });
  }
};

// Get company by ID
export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({ 
        success: false, 
        message: 'Company not found' 
      });
    }

    res.status(200).json({
      success: true,
      company
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Error fetching company' 
    });
  }
};

// Get company by recruiter
export const getCompanyByRecruiter = async (req, res) => {
  try {
    const company = await Company.findOne({ recruiterId: req.userId });

    if (!company) {
      return res.status(404).json({ 
        success: false, 
        message: 'Company not found' 
      });
    }

    res.status(200).json({
      success: true,
      company
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Error fetching company' 
    });
  }
};

// Update company (Recruiter only)
export const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findById(id);

    if (!company) {
      return res.status(404).json({ 
        success: false, 
        message: 'Company not found' 
      });
    }

    // Check if recruiter owns this company
    if (company.recruiterId.toString() !== req.userId) {
      return res.status(403).json({ 
        success: false, 
        message: 'You are not authorized to update this company' 
      });
    }

    // Update company
    Object.assign(company, req.body);
    company.updatedAt = Date.now();
    await company.save();

    res.status(200).json({
      success: true,
      message: 'Company updated successfully',
      company
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Error updating company' 
    });
  }
};

// Get company jobs
export const getCompanyJobs = async (req, res) => {
  try {
    const { id } = req.params;

    const jobs = await Job.find({ companyId: id, status: 'active' })
      .populate('recruiterId', 'fullName email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      jobs
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Error fetching company jobs' 
    });
  }
};

// Get recruiter dashboard data
export const getRecruiterDashboard = async (req, res) => {
  try {
    // Get recruiter's company
    const company = await Company.findOne({ recruiterId: req.userId });
    if (!company) {
      return res.status(404).json({ 
        success: false, 
        message: 'Company not found' 
      });
    }

    // Get jobs count
    const jobsCount = await Job.countDocuments({ recruiterId: req.userId });

    // Get applications count
    const applicationsCount = await Application.countDocuments({ companyId: company._id });

    // Get recent applications
    const recentApplications = await Application.find({ companyId: company._id })
      .populate('candidateId', 'fullName email skills')
      .populate('jobId', 'title')
      .limit(5)
      .sort({ appliedDate: -1 });

    // Get recent jobs
    const recentJobs = await Job.find({ recruiterId: req.userId })
      .limit(5)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: {
        jobsCount,
        applicationsCount,
        recentApplications,
        recentJobs,
        company
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Error fetching dashboard data' 
    });
  }
};

// Get all applicants for recruiter
export const getRecruiterApplicants = async (req, res) => {
  try {
    const company = await Company.findOne({ recruiterId: req.userId });
    if (!company) {
      return res.status(404).json({ 
        success: false, 
        message: 'Company not found' 
      });
    }

    const applications = await Application.find({ companyId: company._id })
      .populate('candidateId', 'fullName email phone skills resumePath location')
      .populate('jobId', 'title')
      .sort({ appliedDate: -1 });

    res.status(200).json({
      success: true,
      applications
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Error fetching applicants' 
    });
  }
};
