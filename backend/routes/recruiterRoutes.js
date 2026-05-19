import express from 'express';
import {
  createCompany,
  getCompanyById,
  getCompanyByRecruiter,
  updateCompany,
  getCompanyJobs,
  getRecruiterDashboard,
  getRecruiterApplicants
} from '../controllers/recruiterController.js';
import { verifyToken, checkRole } from '../middleware/auth.js';

const router = express.Router();

// Protected routes - Recruiter only
router.post('/company', verifyToken, checkRole(['recruiter']), createCompany);
router.get('/company', verifyToken, checkRole(['recruiter']), getCompanyByRecruiter);
router.get('/company/:id', verifyToken, checkRole(['recruiter']), getCompanyById);
router.put('/company/:id', verifyToken, checkRole(['recruiter']), updateCompany);
router.get('/company/:id/jobs', verifyToken, checkRole(['recruiter']), getCompanyJobs);
router.get('/dashboard', verifyToken, checkRole(['recruiter']), getRecruiterDashboard);
router.get('/applicants', verifyToken, checkRole(['recruiter']), getRecruiterApplicants);

export default router;
