import React from 'react';
const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="relative">
      
      <div className="absolute inset-0 rounded-full border-4 border-blue-800 opacity-20 animate-ping"></div>
      
      <div className="w-24 h-24 rounded-full border-t-4 border-r-4 border-blue-800 animate-spin"></div>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-8 h-8 bg-blue-800 rounded-full animate-pulse"></div>
      </div>
      

      <div className="absolute inset-0 rounded-full bg-blue-800 opacity-30 filter blur-xl animate-pulse"></div>
    </div>
  </div>
  );
};

export default Loading;