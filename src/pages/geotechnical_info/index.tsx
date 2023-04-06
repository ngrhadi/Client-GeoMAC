import useGeoInfo from '@/hooks/useGeoInfo';
import React, { useState } from 'react';
import { default as dayjs } from 'dayjs';
import PlusIcon from '@/assets/PlusIcon';
import { useRouter } from 'next/router';

const Page = () => {
  const { data, loading } = useGeoInfo();
  const router = useRouter();

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between mt-5">
        <p className="text-lg">Total Data {data?.length}</p>
        <button
          className="rounded-sm"
          onClick={() => router.push('/geotechnical_info/add')}
        >
          <PlusIcon />
        </button>
      </div>
      {loading === true ? (
        <p>LADING</p>
      ) : (
        <div>
          {data?.map((item) => (
            <div
              className="w-full bg-yellow-300 text-black p-4 gap-10 my-3 rounded-xl"
              key={item.id}
            >
              <div className="flex flex-row justify-between">
                <div>
                  <p className="text-2xl font-bold">{item.project_name}</p>
                  <p>{item.project_contractor}</p>
                </div>
                <div>
                  <p>{item.district}</p>
                  <p>{item.state}</p>
                  <small>
                    {dayjs(item?.created_at?.toString()).format('DD/MM/YYYY')}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
