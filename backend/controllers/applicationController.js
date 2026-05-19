import Application from '../models/Application.js';
import Job from '../models/Job.js';
import User from '../models/User.js';

// Apply for job (Candidate only)
export const applyJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    if (!jobId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Job ID is required' 
      });
    }

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ 
        success: false, 
        message: 'Job not found' 
      });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      candidateId: req.userId,
      jobId: jobId
    });

    if (existingApplication) {
      return res.status(400).json({ 
        success: false, 
        message: 'You have already applied for this job' 
      });
    }

    // Get user resume info
    const user = await User.findById(req.userId);

    // Create application
    const application = new Application({
      candidateId: req.userId,
      jobId: jobId,
      companyId: job.companyId,
      resumePath: user.resumePath,
      status: 'applied'
    });

    await application.save();

    // Update job applicants
    job.applicants.push(req.userId);
    job.applicationCount = job.applicants.length;
    await job.save();

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      application
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Error applying for job' 
    });
  }
};

// Get applications by candidate
export const getApplicationsByCandidate = async (req, res) => {
  try {
    const applications = await Application.find({ candidateId: req.userId })
      .populate('jobId')
      .populate('companyId')
      .sort({ appliedDate: -1 });

    res.status(200).json({
      success: true,
      applications
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Error fetching applications' 
    });
  }
};

// Get application status
export const getApplicationStatus = async (req, res) => {
  try {
    const { jobId } = req.params;

    const application = await Application.findOne({
      candidateId: req.userId,
      jobId: jobId
    });

    if (!application) {
      return res.status(404).json({ 
        success: false, 
        message: 'Application not found' 
      });
    }

    res.status(200).json({
      success: true,
      application
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Error fetching application' 
    });
  }
};

// Get all applications (Recruiter)
export const getApplicationsByJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Verify recruiter owns this job
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ 
        success: false, 
        message: 'Job not found' 
      });
    }

    if (job.recruiterId.toString() !== req.userId) {
      return res.status(403).json({ 
        success: false, 
        message: 'You are not authorized to view these applications' 
      });
    }

    const applications = await Application.find({ jobId: jobId })
      .populate('candidateId', 'fullName email phone skills resumePath')
      .sort({ appliedDate: -1 });

    res.status(200).json({
      success: true,
      applications
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Error fetching applications' 
    });
  }
};

// Update application status (Recruiter)
export const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status, notes, rating } = req.body;

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ 
        success: false, 
        message: 'Application not found' 
      });
    }

    // Verify recruiter owns this application
    const job = await Job.findById(application.jobId);
    if (job.recruiterId.toString() !== req.userId) {
      return res.status(403).json({ 
        success: false, 
        message: 'You are not authorized to update this application' 
      });
    }

    if (status) application.status = status;
    if (notes) application.notes = notes;
    if (rating) application.rating = rating;
    application.updatedAt = Date.now();

    await application.save();

    res.status(200).json({
      success: true,
      message: 'Application updated successfully',
      application
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Error updating application' 
    });
  }
};

// Shortlist candidate (Recruiter)
export const shortlistCandidate = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ 
        success: false, 
        message: 'Application not found' 
      });
    }

    // Verify recruiter owns this application
    const job = await Job.findById(application.jobId);
    if (job.recruiterId.toString() !== req.userId) {
      return res.status(403).json({ 
        success: false, 
        message: 'You are not authorized to shortlist this candidate' 
      });
    }

    application.status = 'shortlisted';
    application.updatedAt = Date.now();
    await application.save();

    res.status(200).json({
      success: true,
      message: 'Candidate shortlisted successfully',
      application
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Error shortlisting candidate' 
    });
  }
};

// Reject candidate (Recruiter)
export const rejectCandidate = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ 
        success: false, 
        message: 'Application not found' 
      });
    }

    // Verify recruiter owns this application
    const job = await Job.findById(application.jobId);
    if (job.recruiterId.toString() !== req.userId) {
      return res.status(403).json({ 
        success: false, 
        message: 'You are not authorized to reject this candidate' 
      });
    }

    application.status = 'rejected';
    application.updatedAt = Date.now();
    await application.save();

    res.status(200).json({
      success: true,
      message: 'Application rejected',
      application
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Error rejecting application' 
    });
  }
};
