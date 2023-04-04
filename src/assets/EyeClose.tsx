import React from 'react';

const EyeClose = () => {
  return (
    <div>
      <svg
        className="h-5 w-5 mr-3 text-[#f3e858]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {' '}
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />{' '}
        <circle cx="12" cy="12" r="3" />
      </svg>
    </div>
  );
};

export default EyeClose;
