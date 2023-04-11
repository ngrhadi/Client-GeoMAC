import HomeIcon from '@/assets/HomeIcon';
import { useRouter } from 'next/router';
import React from 'react';

interface Props {
  title: string;
  nameProject?: string;
}

const BreadCrumb = ({ nameProject, title }: Props) => {
  const router = useRouter();
  return (
    <div className="flex flex-row justify-start gap-x-3">
      <button onClick={() => router.push('/')}>
        <HomeIcon />
      </button>
      <p>/</p>
      <button
        onClick={() => {
          if (router.pathname == '/geotechnical_info') {
            return;
          } else {
            router.back();
          }
        }}
      >
        <p>{title}</p>
      </button>
      <p>/</p>
      <p>{nameProject}</p>
    </div>
  );
};

export default BreadCrumb;
