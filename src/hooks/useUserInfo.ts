import { API } from '@/constant';
import { usersStore } from '@/context/UserContext';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { z } from 'zod';

const UserRegister = z.object({
  email: z.string(),
  password: z.string(),
  username: z.string(),
  company_name: z.string(),
});

export type UserRegisterType = z.infer<typeof UserRegister>;

export type TypeUserForm = UserRegisterType & {
  onChangeField: (e: Partial<UserRegisterType>) => void;
};

export const INITIAL_DATA_USER: UserRegisterType = {
  email: '',
  password: '',
  username: '',
  company_name: '',
};

const useUserInfo = () => {
  const router = useRouter();
  const [data, setData] = useState(INITIAL_DATA_USER);
  const [isLogin, setIsLogin] = useState(false);

  function onChangeField(val: Partial<UserRegisterType>) {
    setData((prev) => {
      return { ...prev, ...val };
    });
  }

  return {
    data,
    setData,
    isLogin,
    setIsLogin,
    onChangeField,
  };
};

export default useUserInfo;
