import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { userAPI } from '../services/api';
import { Upload, Mail, Phone, MapPin, BookOpen, Briefcase } from 'lucide-react';

const ProfilePage = () => {
  const { user, fetchCurrentUser } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: user?.bio || '',
    skills: user?.skills?.join(', ') || '',
    experience: user?.experience || '',
    education: user?.education || ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      const updateData = {
        ...formData,
        skills: formData.skills.split(',').map((s) => s.trim()).filter((s) => s)
      };
      await userAPI.updateProfile(updateData);
      await fetchCurrentUser();
      setIsEditing(false);
      showToast('Profile updated successfully!', 'success');
    } catch (error) {
      showToast(error.response?.data?.message || 'Error updating profile', 'error');
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.pdf')) {
      showToast('Only PDF files are allowed', 'error');
      return;
    }

    setUploadingResume(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('resume', file);
      await userAPI.uploadResume(formDataToSend);
      await fetchCurrentUser();
      setResumeFile(null);
      showToast('Resume uploaded successfully!', 'success');
    } catch (error) {
      showToast(error.response?.data?.message || 'Error uploading resume', 'error');
    } finally {
      setUploadingResume(false);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-bgLight py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden mb-8">
          {/* Header Background */}
          <div className="h-32 bg-gradient-to-r from-primary to-darkBlue"></div>

          {/* Profile Info */}
          <div className="relative px-6 pb-6 -mt-16">
            <div className="flex justify-between items-start mb-6">
              <div className="w-24 h-24 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center text-4xl font-bold text-primary bg-gray-100">
                {user.fullName?.charAt(0).toUpperCase()}
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-darkBlue transition font-medium"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            <h1 className="text-3xl font-bold text-textDark mb-2">{user.fullName}</h1>
            <p className="text-gray-600 mb-4">
              {user.role === 'candidate' ? 'Job Seeker' : 'Recruiter'}
            </p>

            {/* Quick Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-primary" />
                <span>{user.email}</span>
              </div>
              {user.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-primary" />
                  <span>{user.phone}</span>
                </div>
              )}
              {user.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-primary" />
                  <span>{user.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {isEditing ? (
              <form onSubmit={handleSaveProfile} className="bg-white rounded-lg shadow-md border border-gray-200 p-6 space-y-4">
                <h2 className="text-2xl font-bold text-textDark mb-4">Edit Profile</h2>

                <div>
                  <label className="block text-sm font-medium text-textDark mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-textDark mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-textDark mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-textDark mb-2">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Tell us about yourself"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-textDark mb-2">
                    Skills (comma-separated)
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="React, JavaScript, Node.js"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-textDark mb-2">
                      Experience
                    </label>
                    <input
                      type="text"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="5+ years"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-textDark mb-2">
                      Education
                    </label>
                    <input
                      type="text"
                      name="education"
                      value={formData.education}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Bachelor's in Computer Science"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-darkBlue transition font-medium"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 space-y-6">
                {user.bio && (
                  <div>
                    <h3 className="font-bold text-textDark mb-2">About</h3>
                    <p className="text-gray-700">{user.bio}</p>
                  </div>
                )}

                {user.skills && user.skills.length > 0 && (
                  <div>
                    <h3 className="font-bold text-textDark mb-2 flex items-center gap-2">
                      <Briefcase size={18} className="text-primary" />
                      Skills
                    </h3>
                    <div className="flex gap-2 flex-wrap">
                      {user.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-50 text-primary px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {user.experience && (
                  <div>
                    <h3 className="font-bold text-textDark mb-2 flex items-center gap-2">
                      <Briefcase size={18} className="text-primary" />
                      Experience
                    </h3>
                    <p className="text-gray-700">{user.experience}</p>
                  </div>
                )}

                {user.education && (
                  <div>
                    <h3 className="font-bold text-textDark mb-2 flex items-center gap-2">
                      <BookOpen size={18} className="text-primary" />
                      Education
                    </h3>
                    <p className="text-gray-700">{user.education}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar - Resume */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-textDark mb-4">Resume</h3>

              {user.resumePath ? (
                <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-700 mb-3">✓ Resume uploaded</p>
                  <a
                    href={user.resumePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-medium hover:underline"
                  >
                    Download Resume
                  </a>
                </div>
              ) : (
                <p className="text-sm text-gray-600 mb-4">No resume uploaded yet</p>
              )}

              <label className="block">
                <div className="border-2 border-dashed border-primary rounded-lg p-6 text-center cursor-pointer hover:bg-blue-50 transition">
                  <Upload size={32} className="mx-auto text-primary mb-2" />
                  <p className="text-sm font-medium text-gray-700">Upload PDF Resume</p>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleResumeUpload}
                    disabled={uploadingResume}
                    className="hidden"
                  />
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
