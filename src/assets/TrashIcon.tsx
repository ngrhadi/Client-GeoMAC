import React from 'react';

interface Props {
  isSmall?: boolean;
}

const TrashIcon = ({ isSmall }: Props) => {
  return (
    <div>
      <svg
        className={`${isSmall ? 'h-4 w-4' : 'h-8 w-8'} text-red-500`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {' '}
        <polyline points="3 6 5 6 21 6" />{' '}
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />{' '}
        <line x1="10" y1="11" x2="10" y2="17" />{' '}
        <line x1="14" y1="11" x2="14" y2="17" />
      </svg>
    </div>
  );
};

export default TrashIcon;
