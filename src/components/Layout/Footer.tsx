import AskIcon from '@/assets/AskIcon';
import HomeIcon from '@/assets/HomeIcon';
import NoteIcon from '@/assets/NoteIcon';
import QnA from '@/assets/QnA';
import ShareIcon from '@/assets/ShareIcon';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Props {
  setHelperRoute: (value: boolean) => void;
  setHelperParams: (value: string) => void;
}

export default function Footer({ setHelperRoute, setHelperParams }: Props) {
  const router = useRouter();
  return (
    <div className="max-w-screen-2xl mx-auto sticky ">
      <footer className="relative flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-[5px] lg:py-3 px-3 lg:px-16 text-center md:justify-between">
        <p
          color="blue-gray"
          className="hidden lg:block md:block font-normal text-sm lg:text-md"
        >
          &copy; 2023 GeoMAC
        </p>
        <div className="hidden lg:block md:block">
          <ul className="flex flex-wrap items-center gap-y-2 gap-x-3 lg:gap-x-8 justify-center">
            <li>
              <Link
                href="/"
                onClick={() => {
                  setHelperRoute(false);
                  setHelperParams('');
                  router.push('/');
                }}
                className="font-normal text-blue-gray-700 transition-colors hover:text-white focus:text-white text-sm lg:text-md"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about_us"
                onClick={() => {
                  setHelperRoute(true);
                  setHelperParams('/about_us');
                  router.push('/about_us');
                }}
                className="font-normal text-blue-gray-700 transition-colors hover:text-white focus:text-white text-sm lg:text-md"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/qna"
                onClick={() => {
                  setHelperRoute(true);
                  setHelperParams('/qna');
                  router.push('/qna');
                }}
                className="font-normal text-blue-gray-700 transition-colors hover:text-white focus:text-white text-sm lg:text-md"
              >
                Q&A
              </Link>
            </li>
            <li>
              <Link
                href="/share"
                onClick={() => {
                  setHelperRoute(true);
                  setHelperParams('/share');
                  router.push('/share');
                }}
                className="font-normal text-blue-gray-700 transition-colors hover:text-white focus:text-white text-sm lg:text-md"
              >
                Share
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex md:hidden lg:hidden justify-around w-full ">
          <button
            onClick={() => {
              setHelperRoute(false);
              setHelperParams('');
              router.push('/');
            }}
            className="rounded-full w-[2rem] h-[2rem] text-black"
          >
            <HomeIcon />
          </button>
          <button
            onClick={() => {
              setHelperRoute(true);
              setHelperParams('/about_us');
              router.push('/about_us');
            }}
            className="rounded-full w-[2rem] h-[2rem] text-black "
          >
            <AskIcon />
          </button>
          <button
            onClick={() => {
              setHelperRoute(true);
              setHelperParams('/qna');
              router.push('/qna');
            }}
            className="rounded-full w-[2rem] h-[2rem] text-black"
          >
            <QnA />
          </button>
          <button
            onClick={() => {
              setHelperRoute(true);
              setHelperParams('/share');
              router.push('/share');
            }}
            className="rounded-full w-[2rem] h-[2rem] text-black"
          >
            <ShareIcon />
          </button>
        </div>
      </footer>
    </div>
  );
}
