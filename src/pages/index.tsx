import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useRef } from 'react';
import { useIdUsers, usersStore } from '@/context/UserContext';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const router = useRouter();
  const idUser = useIdUsers();
  const store = useRef(usersStore()).current;

  return (
    <>
      <main>
        <div>
          <button
            className="absolute z-20"
            onClick={() => {
              idUser('');
              router.push('/login');
            }}
          >
            Logout
          </button>
        </div>
      </main>
    </>
  );
}
