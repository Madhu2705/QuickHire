import React, { useEffect, useState } from 'react';
import { useToast } from '../context/ToastContext';
import { recruiterAPI, applicationAPI } from '../services/api';
import ApplicationCard from '../components/ApplicationCard';

const ApplicantsList = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchApplicants = async () => {
      setLoading(true);
      try {
        const response = await recruiterAPI.getApplicants();
        setApplications(response.data.applications || []);
      } catch (error) {
        console.error('Failed to load applicants', error);
        showToast('Unable to load applicants. Please try again.', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [showToast]);

  const handleUpdateStatus = async (applicationId, status) => {
    try {
      setUpdatingId(applicationId);
      const updateFn = status === 'shortlisted' ? applicationAPI.shortlistCandidate : applicationAPI.rejectCandidate;
      await updateFn(applicationId);
      setApplications((prevApplications) =>
        prevApplications.map((application) =>
          application._id === applicationId ? { ...application, status } : application
        )
      );
      showToast(`Application ${status === 'shortlisted' ? 'shortlisted' : 'rejected'} successfully.`, 'success');
    } catch (error) {
      console.error(`Failed to ${status} application`, error);
      showToast('Unable to update application status. Please try again.', 'error');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-bgLight py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-textDark mb-2">Applicants</h1>
          <p className="text-gray-600">Manage applicants for your job postings</p>
        </div>

        {loading ? (
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 text-center">
            <p className="text-gray-600">Loading applicants...</p>
          </div>
        ) : applications.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 text-center">
            <p className="text-gray-600">No applications found yet.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {applications.map((application) => (
              <ApplicationCard
                key={application._id}
                application={application}
                showActions={true}
                onUpdateStatus={handleUpdateStatus}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicantsList;
