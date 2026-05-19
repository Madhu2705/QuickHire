import User from '../models/User.js';
import fs from 'fs';
import path from 'path';

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const { fullName, phone, location, bio, skills, experience, education } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        fullName,
        phone,
        location,
        bio,
        skills: skills || [],
        experience,
        education,
        updatedAt: Date.now()
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Upload resume
export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please upload a resume' 
      });
    }

    // Get old resume path and delete if exists
    const user = await User.findById(req.userId);
    if (user.resumePath) {
      const oldPath = path.join(process.cwd(), user.resumePath);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    const resumePath = `/uploads/resumes/${req.file.filename}`;

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      {
        resumePath,
        resumeFileName: req.file.originalname
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Resume uploaded successfully',
      user: updatedUser,
      resumePath
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId || req.userId)
      .populate('companyId')
      .populate('savedJobs');

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Save job
export const saveJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    const user = await User.findById(req.userId);

    if (user.savedJobs.includes(jobId)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Job already saved' 
      });
    }

    user.savedJobs.push(jobId);
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Job saved successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Unsave job
export const unsaveJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { $pull: { savedJobs: jobId } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Job removed from saved',
      user
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Get saved jobs
export const getSavedJobs = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .populate('savedJobs');

    res.status(200).json({
      success: true,
      savedJobs: user.savedJobs || []
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};
