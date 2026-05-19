import React from 'react';
import { getApplicationStatusColor } from '../utils/helpers';
import { FileText, CheckCircle, XCircle } from 'lucide-react';

const ApplicationCard = ({ application, onUpdateStatus, showActions = false }) => {
  const statusColor = getApplicationStatusColor(application.status);

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-textDark">
            {application.jobId?.title || 'Job Title'}
          </h3>
          <p className="text-gray-600 text-sm">
            {application.candidateId?.fullName || 'Candidate Name'}
          </p>
        </div>
        <span
          className="px-3 py-1 rounded-full text-sm font-medium text-white"
          style={{ backgroundColor: statusColor }}
        >
          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
        </span>
      </div>

      <div className="space-y-2 text-sm text-gray-600 mb-4">
        {application.candidateId?.email && (
          <p>Email: {application.candidateId.email}</p>
        )}
        {application.candidateId?.phone && (
          <p>Phone: {application.candidateId.phone}</p>
        )}
        {application.candidateId?.skills && application.candidateId.skills.length > 0 && (
          <div>
            <p className="font-medium text-gray-700 mb-2">Skills:</p>
            <div className="flex gap-2 flex-wrap">
              {application.candidateId.skills.slice(0, 3).map((skill, idx) => (
                <span key={idx} className="bg-gray-100 px-2 py-1 rounded text-xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {application.notes && (
        <div className="mb-4 p-3 bg-gray-50 rounded border border-gray-200">
          <p className="text-xs font-medium text-gray-700 mb-1">Notes:</p>
          <p className="text-xs text-gray-600">{application.notes}</p>
        </div>
      )}

      {showActions && (
        <div className="flex gap-2 border-t border-gray-200 pt-4">
          {application.status === 'applied' && (
            <>
              <button
                onClick={() => onUpdateStatus(application._id, 'shortlisted')}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded hover:bg-green-100 transition text-sm font-medium"
              >
                <CheckCircle size={16} />
                Shortlist
              </button>
              <button
                onClick={() => onUpdateStatus(application._id, 'rejected')}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition text-sm font-medium"
              >
                <XCircle size={16} />
                Reject
              </button>
            </>
          )}
          {application.candidateId?.resumePath && (
            <a
              href={application.candidateId.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition text-sm font-medium"
            >
              <FileText size={16} />
              Resume
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default ApplicationCard;
