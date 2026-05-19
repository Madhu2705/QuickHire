import express from 'express';
import {
  updateProfile,
  uploadResume,
  getUserProfile,
  saveJob,
  unsaveJob,
  getSavedJobs
} from '../controllers/userController.js';
import { verifyToken } from '../middleware/auth.js';
import upload from '../middleware/multer.js';

const router = express.Router();

// Protected routes
router.put('/profile', verifyToken, updateProfile);
router.post('/resume', verifyToken, upload.single('resume'), uploadResume);
router.get('/profile/:userId?', verifyToken, getUserProfile);
router.post('/save-job', verifyToken, saveJob);
router.delete('/save-job/:jobId', verifyToken, unsaveJob);
router.get('/saved-jobs', verifyToken, getSavedJobs);

export default router;
