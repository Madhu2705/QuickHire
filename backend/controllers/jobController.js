import Job from '../models/Job.js';
import Application from '../models/Application.js';
import User from '../models/User.js';

// Get all jobs with filters
export const getAllJobs = async (req, res) => {
  try {
    const { title, location, jobType, experienceLevel, category, page = 1, limit = 10 } = req.query;

    // Build filter
    let filter = { status: 'active' };
    if (title) filter.title = { $regex: title, $options: 'i' };
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (jobType) filter.jobType = jobType;
    if (experienceLevel) filter.experienceLevel = experienceLevel;
    if (category) filter.category = { $regex: category, $options: 'i' };

    const skip = (page - 1) * limit;

    const jobs = await Job.find(filter)
      .populate('companyId', 'name logo industry location')
      .populate('recruiterId', 'fullName email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Job.countDocuments(filter);

    res.status(200).json({
      success: true,
      jobs,
      total,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Error fetching jobs' 
    });
  }
};

// Get job by ID
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('companyId')
      .populate('recruiterId', 'fullName email phone');

    if (!job) {
      return res.status(404).json({ 
        success: false, 
        message: 'Job not found' 
      });
    }

    res.status(200).json({
      success: true,
      job
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Error fetching job' 
    });
  }
};

// Get jobs by recruiter
export const getJobsByRecruiter = async (req, res) => {
  try {
    const jobs = await Job.find({ recruiterId: req.userId })
      .populate('companyId')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      jobs
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Error fetching jobs' 
    });
  }
};

// Create job (Recruiter only)
export const createJob = async (req, res) => {
  try {
    const { title, description, requirements, salary, location, jobType, experienceLevel, category, companyId } = req.body;

    // Validation
    if (!title || !description || !location || !jobType || !experienceLevel || !companyId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide all required fields' 
      });
    }

    const job = new Job({
      title,
      description,
      requirements: requirements || [],
      salary: salary || {},
      location,
      jobType,
      experienceLevel,
      category: category || 'General',
      companyId,
      recruiterId: req.userId
    });

    await job.save();

    res.status(201).json({
      success: true,
      message: 'Job created successfully',
      job
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Error creating job' 
    });
  }
};

// Update job (Recruiter only)
export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({ 
        success: false, 
        message: 'Job not found' 
      });
    }

    // Check if recruiter owns this job
    if (job.recruiterId.toString() !== req.userId) {
      return res.status(403).json({ 
        success: false, 
        message: 'You are not authorized to update this job' 
      });
    }

    // Update job
    Object.assign(job, req.body);
    job.updatedAt = Date.now();
    await job.save();

    res.status(200).json({
      success: true,
      message: 'Job updated successfully',
      job
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Error updating job' 
    });
  }
};

// Delete job (Recruiter only)
export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({ 
        success: false, 
        message: 'Job not found' 
      });
    }

    // Check if recruiter owns this job
    if (job.recruiterId.toString() !== req.userId) {
      return res.status(403).json({ 
        success: false, 
        message: 'You are not authorized to delete this job' 
      });
    }

    await Job.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Error deleting job' 
    });
  }
};
