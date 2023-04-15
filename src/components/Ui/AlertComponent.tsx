import InfoIcon from '@/assets/InfoIcon';
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useRef } from 'react';

interface Props {
  isSuccess?: boolean;
  isInfo?: boolean;
  isError?: boolean;
  isOpenAlert: boolean;
  setIsOpenAlert: (value: boolean) => void;
  messageSuccess?: string;
  messageInfo?: string;
  messageError?: string;
}

const AlertComponent = ({
  isSuccess,
  isInfo,
  isError,
  isOpenAlert,
  setIsOpenAlert,
  messageSuccess,
  messageInfo,
  messageError,
}: Props) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={isOpenAlert} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setIsOpenAlert}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-transparent bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden  bg-white text-left shadow-xl transition-all my-8 w-full max-w-lg">
                <div
                  className={`flex items-center ${
                    isSuccess
                      ? 'bg-green-500'
                      : isInfo
                      ? 'bg-blue-500'
                      : 'bg-red-500'
                  } text-white text-sm font-bold px-4 py-3`}
                  role="alert"
                >
                  <InfoIcon />
                  <p>
                    {isSuccess
                      ? messageSuccess
                      : isInfo
                      ? messageInfo
                      : messageError}
                  </p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default AlertComponent;
