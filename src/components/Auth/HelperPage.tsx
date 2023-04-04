import PageAboutUs from '@/pages/about_us';
import PageNote from '@/pages/note';
import PageQnA from '@/pages/qna';
import PageShare from '@/pages/share';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

interface Props {
  helperParams: string;
}

const HelperPage = ({ helperParams }: Props) => {
  return (
    <div>
      {helperParams.length > 0 && helperParams === '/about_us' ? (
        <PageAboutUs />
      ) : helperParams === '/qna' ? (
        <PageQnA />
      ) : helperParams === '/note' ? (
        <PageNote />
      ) : helperParams === '/share' ? (
        <PageShare />
      ) : null}
    </div>
  );
};

export default HelperPage;
