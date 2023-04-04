import Link from 'next/link';
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import logo from '@/assets/geomad_logo.png';
import { useIdUsers, usersStore } from '@/context/UserContext';
import LogoutIcon from '@/assets/LogoutIcon';
import MenuOpen from '@/assets/MenuOpen';
import MenuClose from '@/assets/MenuClose';
import Cookies from 'js-cookie';

interface Props {
  sideBar: boolean;
  setSidebar: (value: boolean) => void;
}

const Header = ({ sideBar, setSidebar }: Props) => {
  const router = useRouter();
  return (
    <section className="bg-zinc-700/40 sticky top-0 bg-[#5EAB44]">
      <div className="lg:w-screen max-w-screen-2xl mx-auto h-14 lg:h-20 justify-between flex flex-row items-center text-sm lg:text-lg">
        <div className="flex flex-row gap-5 pl-5 lg:pl-20 items-center">
          <div className="flex md:hidden lg:hidden">
            <button onClick={() => setSidebar(!sideBar)}>
              {sideBar ? <MenuOpen /> : <MenuClose />}
            </button>
          </div>
          <div>
            <Image
              src={logo}
              width={80}
              height={10}
              alt="logo-geo"
              className="rotate-0 lg:rotate-6"
              onClick={() => router.push('/')}
            />
          </div>
          <div className="flex md:flex lg:hidden flex-row md:flex-row">
            <p className="text-lg -ml-6">GeoMAC</p>
          </div>
          <div className="hidden md:flex lg:flex flex-row gap-5">
            <Link
              className="text-blue-gray-700 hover:text-white focus:text-white"
              href="/"
            >
              Home
            </Link>
            <Link
              className="text-blue-gray-700 hover:text-white focus:text-white"
              href="/geotechnical_info"
            >
              Information
            </Link>
            <Link
              className="text-blue-gray-700 hover:text-white focus:text-white"
              href="/geotechnical_scoring"
            >
              Scoring
            </Link>
            <Link
              className="text-blue-gray-700 hover:text-white focus:text-white"
              href="/geotechnical_calculator"
            >
              Calculator
            </Link>
          </div>
        </div>
        <button
          className="pr-5 lg:pr-20"
          onClick={() => {
            router.push('/logout');
          }}
        >
          <LogoutIcon />
        </button>
      </div>
    </section>
  );
};

export default Header;
