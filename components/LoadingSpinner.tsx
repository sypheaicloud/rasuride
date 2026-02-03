import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-500 mb-4"></div>
      <p className="text-slate-400 animate-pulse">Loading Premium Fleet...</p>
    </div>
  );
};

export default LoadingSpinner;