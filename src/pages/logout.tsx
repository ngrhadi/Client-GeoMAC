import { useIdUsers } from '@/context/UserContext';
import useAuthCookies from '@/hooks/useAuthCookies';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const Page = () => {
  const idUser = useIdUsers();
  const router = useRouter();
  const { setIsValid } = useAuthCookies();

  useEffect(() => {
    setIsValid(false);
    Cookies.remove('_cxrf');
    Cookies.remove('token');

    router.push('/');
    idUser('');
  }, [setIsValid]);
  return null;
};

export default Page;
