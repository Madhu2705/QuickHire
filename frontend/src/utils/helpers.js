// Color palette
export const colors = {
  primary: '#2563EB',
  darkBlue: '#1E40AF',
  bgLight: '#F8FAFC',
  cardBg: '#FFFFFF',
  textDark: '#0F172A',
  textGray: '#64748B',
  borderColor: '#E2E8F0',
  successColor: '#10B981',
  dangerColor: '#EF4444',
  warningColor: '#F59E0B'
};

// Format date
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Format currency
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

// Truncate text
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Get initials from name
export const getInitials = (name) => {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

// Job type badge color
export const getJobTypeBadgeColor = (jobType) => {
  switch (jobType) {
    case 'Full-time':
      return '#10B981';
    case 'Part-time':
      return '#F59E0B';
    case 'Contract':
      return '#3B82F6';
    case 'Internship':
      return '#8B5CF6';
    default:
      return '#64748B';
  }
};

// Application status color
export const getApplicationStatusColor = (status) => {
  switch (status) {
    case 'applied':
      return '#3B82F6';
    case 'shortlisted':
      return '#10B981';
    case 'rejected':
      return '#EF4444';
    case 'selected':
      return '#06B6D4';
    case 'in-progress':
      return '#F59E0B';
    default:
      return '#64748B';
  }
};
