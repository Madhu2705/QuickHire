import React from 'react';
import { MapPin, DollarSign, Briefcase, Clock, Bookmark, BookmarkMinus } from 'lucide-react';
import { formatDate, getJobTypeBadgeColor } from '../utils/helpers';

const JobCard = ({ job, onApply, onSave, isSaved = false, isApplied = false }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-bold text-textDark">{job.title}</h3>
          <p className="text-gray-600 text-sm">{job.companyId?.name}</p>
        </div>
        <button
          onClick={() => onSave && onSave(job._id)}
          className="text-primary hover:text-darkBlue transition"
        >
          {isSaved ? <BookmarkMinus size={24} /> : <Bookmark size={24} />}
        </button>
      </div>

      {/* Job Details */}
      <div className="space-y-2 mb-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-primary" />
          <span>{job.location}</span>
        </div>
        {job.salary?.min && (
          <div className="flex items-center gap-2">
            <DollarSign size={16} className="text-primary" />
            <span>
              {job.salary.min} - {job.salary.max} {job.salary.currency}
            </span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Briefcase size={16} className="text-primary" />
          <span>{job.jobType}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-primary" />
          <span>{job.experienceLevel}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 text-sm mb-4 line-clamp-2">
        {job.description}
      </p>

      {/* Requirements */}
      {job.requirements && job.requirements.length > 0 && (
        <div className="mb-4">
          <div className="flex gap-2 flex-wrap">
            {job.requirements.slice(0, 3).map((req, idx) => (
              <span
                key={idx}
                className="bg-blue-50 text-primary text-xs px-3 py-1 rounded-full"
              >
                {req}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-between items-center border-t border-gray-200 pt-4">
        <span className="text-xs text-gray-500">
          {formatDate(job.createdAt)}
        </span>
        <button
          onClick={() => onApply && onApply(job._id)}
          disabled={isApplied}
          className={`px-6 py-2 rounded-lg font-medium transition ${
            isApplied
              ? 'bg-gray-100 text-gray-600 cursor-not-allowed'
              : 'bg-primary text-white hover:bg-darkBlue'
          }`}
        >
          {isApplied ? 'Applied' : 'Apply Now'}
        </button>
      </div>
    </div>
  );
};

export default JobCard;
