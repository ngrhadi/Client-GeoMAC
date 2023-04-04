import React from 'react';

const MenuClose = () => {
  return (
    <div>
      <svg
        className="h-8 w-8 text-white"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {' '}
        <path stroke="none" d="M0 0h24v24H0z" />{' '}
        <line x1="20" y1="6" x2="9" y2="6" />{' '}
        <line x1="20" y1="12" x2="13" y2="12" />{' '}
        <line x1="20" y1="18" x2="9" y2="18" /> <path d="M4 8l4 4l-4 4" />
      </svg>
    </div>
  );
};

export default MenuClose;
