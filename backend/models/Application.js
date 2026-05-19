import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  status: {
    type: String,
    enum: ['applied', 'shortlisted', 'rejected', 'selected', 'in-progress'],
    default: 'applied'
  },
  appliedDate: {
    type: Date,
    default: Date.now
  },
  resumePath: String,
  coverLetter: String,
  notes: String,
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Index for faster queries
applicationSchema.index({ candidateId: 1, jobId: 1 }, { unique: true });
applicationSchema.index({ jobId: 1 });
applicationSchema.index({ companyId: 1 });
applicationSchema.index({ status: 1 });

const Application = mongoose.model('Application', applicationSchema);
export default Application;
