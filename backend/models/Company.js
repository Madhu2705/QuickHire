import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide company name'],
    unique: true,
    trim: true
  },
  description: String,
  website: String,
  email: String,
  phone: String,
  location: {
    city: String,
    state: String,
    country: String
  },
  logo: String,
  industry: String,
  companySize: {
    type: String,
    enum: ['Startup', 'Small (10-50)', 'Medium (50-500)', 'Large (500+)']
  },
  foundedYear: Number,
  recruiterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  jobsPosted: {
    type: Number,
    default: 0
  },
  applicantsReceived: {
    type: Number,
    default: 0
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
companySchema.index({ recruiterId: 1 });

const Company = mongoose.model('Company', companySchema);
export default Company;
