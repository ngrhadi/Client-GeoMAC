import FormWrapper from '@/components/Form/FormWrapper';
import { FieldInput } from '@/components/Ui/FieldInput';
import { API } from '@/constant';
import {
  UserContext,
  useContextUser,
  useCurrentUser,
  useIdUsers,
  useTokenUser,
  useUserNameCtx,
  useUserSetter,
  usersStore,
} from '@/context/UserContext';
import useUserInfo, {
  INITIAL_DATA_USER,
  TypeUserForm,
  UserRegisterType,
} from '@/hooks/useUserInfo';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useStore } from 'zustand';
import Cookies from 'js-cookie';
import useAuthCookies from '@/hooks/useAuthCookies';

interface Props {
  setIsLogin: (value: boolean) => void;
}

const LoginPage = ({ setIsLogin }: Props) => {
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);
  const [sendData, setSendData] = useState(false);
  const { data, onChangeField } = useUserInfo();
  const idUser = useIdUsers();
  const tokenUser = useTokenUser();
  const nameUser = useUserNameCtx();

  useEffect(() => {
    let name = data.username;
    let password = data.password;
    if (sendData === false) {
      return;
    } else {
      API.post(`${process.env.NEXT_PUBLIC_API}/user/login`, {
        data: {
          username: name,
          password: password,
        },
      })
        .then(async (res) => {
          let value = res.data;
          router.push('/');
          setSendData(false);
          idUser(value?.data?.id);
          tokenUser(value?.data?.token);
          nameUser(value?.data?.username);
          Cookies.set('_cxrf', value?.data?._cxrf, {
            expires: 60 * 60 * 1000,
            sameSite: 'strict',
            secure: true,
          });

          console.log();
          return res.data;
        })
        .catch((error) => {
          setSendData(false);
        });
    }

    return () => {};
  }, [sendData, data]);

  return (
    <div className="flex flex-col">
      <FormWrapper title="Login">
        <div className="flex flex-col">
          <FieldInput
            placeHolder="username/email"
            titleLabel="username"
            htmlFor="username"
            type="text"
            required={true}
            autoComplete={'off'}
            value={data.username}
            onChange={(e) => onChangeField({ username: e.target.value })}
            // errors={errors}
          />
          <FieldInput
            placeHolder="password"
            titleLabel="password"
            htmlFor="password"
            type={showPw ? 'text' : 'password'}
            required={true}
            showPw={showPw}
            isPassword={true}
            autoComplete={'off'}
            value={data.password}
            onChange={(e) => onChangeField({ password: e.target.value })}
            onShowPassword={() => setShowPw(!showPw)}
            // errors={errors}
          />
          <span className="py-3 flex flex-col items-center justify-between">
            <div className="flex flex-row items-center">
              <p className="text-slate-500">Not have account ? </p>
              <Link
                href={'/register'}
                className="p-2 hover:text-[#f3e858]"
                onClick={() => {
                  setIsLogin(false);
                  router.push('/register');
                }}
              >
                Register
              </Link>
            </div>
            <div className="flex flex-row items-center">
              <p className="text-slate-500">Forgot Password ? </p>
              <Link
                href={'/login'}
                className="p-2 hover:text-[#f3e858]"
                onClick={() => {
                  setIsLogin(false);
                  router.push('/login');
                }}
              >
                Reset Password
              </Link>
            </div>
          </span>
          <button
            className="py-3 bg-[#f3e858] text-black my-4"
            type="submit"
            onClick={() => {
              setIsLogin(true);
              setSendData(true);
            }}
          >
            LOGIN
          </button>
        </div>
      </FormWrapper>
    </div>
  );
};

export default LoginPage;

// export const getServerSideProps = () => {};
