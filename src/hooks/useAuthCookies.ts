import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';

const useAuthCookies = () => {
  const authCookies = Cookies.get('_cxrf') as string;
  const [isValid, setIsValid] = useState(false);


  useEffect(() => {
    if (authCookies !== undefined) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }

    return;
  }, [authCookies]);

  return {
    isValid,
    setIsValid,
  };
};

export default useAuthCookies;
