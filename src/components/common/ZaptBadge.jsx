import React from 'react';

const ZaptBadge = () => {
  return (
    <div className="fixed bottom-4 left-4 z-50">
      <a 
        href="https://www.zapt.ai" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-xs bg-black text-white px-2 py-1 rounded-md opacity-75 hover:opacity-100 transition-opacity"
      >
        Made on ZAPT
      </a>
    </div>
  );
};

export default ZaptBadge;