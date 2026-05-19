import express from 'express';
import {
  getAllJobs,
  getJobById,
  getJobsByRecruiter,
  createJob,
  updateJob,
  deleteJob
} from '../controllers/jobController.js';
import { verifyToken, checkRole } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllJobs);
router.get('/:id', getJobById);

// Protected routes - Recruiter only
router.post('/', verifyToken, checkRole(['recruiter']), createJob);
router.put('/:id', verifyToken, checkRole(['recruiter']), updateJob);
router.delete('/:id', verifyToken, checkRole(['recruiter']), deleteJob);
router.get('/recruiter/jobs', verifyToken, checkRole(['recruiter']), getJobsByRecruiter);

export default router;
