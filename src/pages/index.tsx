import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useRef, useState } from 'react';
import { useIdUsers, usersStore } from '@/context/UserContext';
import { useRouter } from 'next/router';
import CardComponent from '@/components/Ui/CardComponent';
import Calendar from '../components/Ui/Calender';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const router = useRouter();
  const [pathCard, setPathCard] = useState([
    {
      title: 'Geotechnical Information',
      url: '/geotechnical_info',
    },
    {
      title: 'Geotechnical Scoring',
      url: '/geotechnical_scoring',
    },
    {
      title: 'Geotechnical Calculator',
      url: 'geotechnical_calculator',
    },
  ]);
  const idUser = useIdUsers();
  const store = useRef(usersStore()).current;

  return (
    <main className="min-h-full">
      <div className="flex flex-col gap-y-5">
        {pathCard.map((item) => (
          <CardComponent key={item.title} url={item.url}>
            {item.title}
          </CardComponent>
        ))}
      </div>
      {/* <Calendar yearlyLeaves="2023" /> */}
    </main>
  );
}
