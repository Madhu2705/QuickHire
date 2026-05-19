import React from 'react';
import { Camera, User, Mail, Phone, MapPin, Edit2 } from 'lucide-react';

const ProfileCard = ({ user, onEdit, isEditing = false }) => {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      {/* Header Background */}
      <div className="h-32 bg-gradient-to-r from-primary to-darkBlue"></div>

      {/* Profile Content */}
      <div className="relative px-6 pb-6">
        {/* Avatar */}
        <div className="flex justify-between items-start -mt-16 mb-4">
          <div className="w-24 h-24 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center text-3xl font-bold text-primary bg-gray-100">
            {user.fullName.charAt(0).toUpperCase()}
          </div>
          {onEdit && (
            <button
              onClick={onEdit}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-darkBlue transition"
            >
              <Edit2 size={16} />
              Edit Profile
            </button>
          )}
        </div>

        {/* Info */}
        <div className="space-y-3">
          <div>
            <h2 className="text-2xl font-bold text-textDark">{user.fullName}</h2>
            <p className="text-gray-600">{user.role === 'recruiter' ? 'Recruiter' : 'Candidate'}</p>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
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

          {/* Bio */}
          {user.bio && (
            <div>
              <p className="text-sm text-gray-700">{user.bio}</p>
            </div>
          )}

          {/* Skills */}
          {user.skills && user.skills.length > 0 && (
            <div>
              <h3 className="font-medium text-textDark mb-2">Skills</h3>
              <div className="flex gap-2 flex-wrap">
                {user.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-50 text-primary px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
