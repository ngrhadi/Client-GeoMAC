import { useRouter } from 'next/router';
import React from 'react';

interface Props {
  children: React.ReactNode;
  url?: string;
}

const CardComponent = ({ children, url }: Props) => {
  const router = useRouter();

  return (
    <div
      className="flex w-full align-middle justify-center items-center bg-yellow-500/70 flex-row p-2 rounded-md hover:cursor-pointer hover:bg-yellow-500/50"
      onClick={() => router.push(url ?? '/')}
    >
      <div className="">{children}</div>
    </div>
  );
};

export default CardComponent;
