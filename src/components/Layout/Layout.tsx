import { UserContext, useIdUsers, usersStore } from '@/context/UserContext';
import useUserInfo from '@/hooks/useUserInfo';
import Head from 'next/head';
import React, { useRef, useState } from 'react';
import LoginForm from '../Auth/LoginForm';
import Header from './Header';
import Footer from './Footer';
import HelperPage from '../Auth/HelperPage';
import Cookies from 'js-cookie';
import useAuthCookies from '@/hooks/useAuthCookies';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const { isValid } = useAuthCookies();
  const authCookies = Cookies.get('_cxrf') as string;
  const [helperRoute, setHelperRoute] = useState(false);
  const [helperParams, setHelperParams] = useState('');
  const store = useRef(usersStore()).current;
  const [sideBar, setSidebar] = useState(false);
  // const idUser = useIdUsers();
  // const idUser = useIdUsers();
  const { isLogin, setIsLogin } = useUserInfo();

  return (
    <main className="w-screen h-screen overflow-x-hidden overflow-y-auto">
      <Head>
        <title>GEOMAC</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/geomad_logo.png" />
      </Head>
      {isValid === true ?? authCookies.length > 0 ? (
        <Header sideBar={sideBar} setSidebar={setSidebar} />
      ) : null}
      <section className="max-w-2xl mx-auto items-center align-middle lg:min-w-[70rem] md:min-w-[30rem] px-5 md:px-20 lg:px-44 mb-20 mt-2">
        <UserContext.Provider value={store}>
          {isValid === true ?? authCookies.length > 0 ? (
            <>{children}</>
          ) : (
            <>
              {helperParams?.length > 0 ? (
                <div className="w-full h-full">
                  <HelperPage helperParams={helperParams} />
                </div>
              ) : (
                <LoginForm
                  helperRoute={helperRoute}
                  login={isLogin}
                  helperParams={helperParams}
                  setIsLogin={setIsLogin}
                />
              )}
            </>
          )}
        </UserContext.Provider>
      </section>
      <footer className="absolute bottom-0 w-screen">
        <div className="bg-zinc-700 md:bg-[#f3e858] lg:bg-[#f3e858] text-[#000000]">
          <Footer
            setHelperRoute={setHelperRoute}
            setHelperParams={setHelperParams}
          />
        </div>
      </footer>
    </main>
  );
};

export default Layout;
