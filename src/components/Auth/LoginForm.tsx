import useUserInfo, {
  INITIAL_DATA_USER,
  UserRegisterType,
} from '@/hooks/useUserInfo';
import LoginPage from '@/pages/login';
import RegisterPage from '@/pages/register';
import Image from 'next/image';
import React, { useState } from 'react';
import geomadLogo from '@/assets/geomad_logo.png';
import HelperPage from './HelperPage';

interface Props {
  login: boolean;
  helperRoute: boolean;
  helperParams: string;
  setIsLogin: (value: boolean) => void;
}

const LoginForm = ({ login, helperRoute, helperParams, setIsLogin }: Props) => {
  const { data, onChangeField } = useUserInfo();
  // const [data, setData] = useState(INITIAL_DATA_USER);

  return (
    <div className="flex flex-col h-screen mt-[-1rem]">
      <div className="w-full h-full align-middle flex flex-col justify-center items-center">
        <Image src={geomadLogo} width={200} height={200} alt={'logo'} />
        <div className="min-w-full">
          {helperRoute === false ? (
            <>
              {login === true ? (
                <LoginPage {...data} setIsLogin={setIsLogin} />
              ) : (
                <RegisterPage {...data} setIsLogin={setIsLogin} />
              )}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
