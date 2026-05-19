import React from 'react';

export const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-8 h-8">
        <div className="absolute w-8 h-8 bg-primary rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute w-8 h-8 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export const PageLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-4">
          <div className="absolute w-16 h-16 bg-primary rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute w-16 h-16 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
        </div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
};

export const SkeletonLoader = () => {
  return (
    <div className="bg-white rounded-lg p-6 mb-4">
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
      </div>
    </div>
  );
};
