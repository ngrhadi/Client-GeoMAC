import FormWrapper from '@/components/Form/FormWrapper';
import useUserInfo, {
  TypeUserForm,
  UserRegisterType,
} from '@/hooks/useUserInfo';
import React, { useEffect, useRef, useState } from 'react';
import { FieldInput } from '../components/Ui/FieldInput';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { API } from '@/constant';
import { useContextUser, usersStore } from '@/context/UserContext';
import { useStore } from 'zustand';

interface Props {
  setIsLogin: (value: boolean) => void;
}

const RegisterPage = ({ setIsLogin }: Props) => {
  const [showPw, setShowPw] = useState(false);
  const router = useRouter();
  const [sendData, setSendData] = useState(false);
  const { data, setData, onChangeField } = useUserInfo();
  const store = useRef(usersStore()).current;

  useEffect(() => {
    if (sendData === false) return;
    console.log('data : ' + data);
    console.log('masuk login');
    API.post('/user/register', {
      data: {
        email: data.email,
        username: data.username,
        password: data.password,
        company_name: data.company_name,
      },
    })
      .then((res) => {
        res.data;
        router.push('/login');
      })
      .catch((err) => router.push('/error'))
      .finally(() => router.push('/'));
  }, [sendData, data]);
  return (
    <div className="flex flex-col">
      <FormWrapper title="Register">
        <div className="flex flex-col">
          <FieldInput
            placeHolder="email"
            titleLabel="email"
            htmlFor="email"
            type="text"
            required={true}
            autoComplete={'off'}
            value={data.email}
            onChange={(e) => onChangeField({ email: e.target.value })}
            // errors={errors}
          />
          <FieldInput
            placeHolder="username"
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
          <FieldInput
            placeHolder="company_name"
            titleLabel="company_name"
            htmlFor="company_name"
            type="text"
            required={true}
            autoComplete={'off'}
            value={data.company_name}
            onChange={(e) => onChangeField({ company_name: e.target.value })}
            // errors={errors}
          />
          <span className="py-3 flex flex-col items-center justify-between">
            <div className="flex flex-row items-center">
              <p className="text-slate-500">Already have account ? </p>
              <Link
                href={'/login'}
                className="p-2 hover:text-[#f3e858]"
                onClick={() => {
                  setIsLogin(true);
                  router.push('/login');
                }}
              >
                Login
              </Link>
            </div>
          </span>
          <button
            className="py-3 bg-[#f3e858] text-black my-4"
            type="submit"
            onClick={() => {
              setIsLogin(false);
              setSendData(true);
            }}
          >
            REGISTER
          </button>
        </div>
      </FormWrapper>
    </div>
  );
};

export default RegisterPage;
