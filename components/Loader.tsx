import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center p-8">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-[#E5734B]"></div>
    </div>
  );
};

export default Loader;