import HomeIcon from '@/assets/HomeIcon';
import { useRouter } from 'next/router';
import React from 'react';

interface Props {
  title: string;
  nameProject?: string;
  isEdit?: boolean;
  isEditFile?: boolean;
}

const BreadCrumb = ({ isEdit, nameProject, title, isEditFile }: Props) => {
  const router = useRouter();
  return (
    <div className="flex flex-row justify-start gap-x-3 text-xs lg:text-base items-center">
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
      <p>
        {nameProject?.length !== 0
          ? nameProject
          : isEdit
          ? 'Edit Project'
          : isEditFile
          ? 'Edit File'
          : 'Add Project'}
      </p>
    </div>
  );
};

export default BreadCrumb;
