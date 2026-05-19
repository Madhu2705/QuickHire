import express from 'express';
import {
  applyJob,
  getApplicationsByCandidate,
  getApplicationStatus,
  getApplicationsByJob,
  updateApplicationStatus,
  shortlistCandidate,
  rejectCandidate
} from '../controllers/applicationController.js';
import { verifyToken, checkRole } from '../middleware/auth.js';

const router = express.Router();

// Candidate routes
router.post('/', verifyToken, checkRole(['candidate']), applyJob);
router.get('/candidate/applications', verifyToken, checkRole(['candidate']), getApplicationsByCandidate);
router.get('/candidate/status/:jobId', verifyToken, checkRole(['candidate']), getApplicationStatus);

// Recruiter routes
router.get('/job/:jobId', verifyToken, checkRole(['recruiter']), getApplicationsByJob);
router.put('/:applicationId/status', verifyToken, checkRole(['recruiter']), updateApplicationStatus);
router.put('/:applicationId/shortlist', verifyToken, checkRole(['recruiter']), shortlistCandidate);
router.put('/:applicationId/reject', verifyToken, checkRole(['recruiter']), rejectCandidate);

export default router;
