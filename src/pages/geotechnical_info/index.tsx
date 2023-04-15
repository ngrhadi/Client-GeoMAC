import useGeoInfo from '@/hooks/useGeoInfo';
import React, { useEffect, useState } from 'react';
import { default as dayjs } from 'dayjs';
import PlusIcon from '@/assets/PlusIcon';
import { useRouter } from 'next/router';
import useIdProject from '@/hooks/useIdProject';
import BreadCrumb from '@/components/Ui/BreadCrumb';

const Page = () => {
  const { data, loading } = useGeoInfo();
  const router = useRouter();

  return (
    <div className="w-full">
      <BreadCrumb title="Geotechnical Info" />
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
              className="w-full hover:cursor-pointer hover:bg-yellow-300/70 bg-yellow-300 text-black p-4 gap-10 my-3 rounded-xl"
              key={item.id}
              onClick={() => {
                // setIdProject(item.id);
                router.push({
                  pathname: `/geotechnical_info/${item.id}`,
                  // pathname: `/geotechnical_info`,
                  // query: {
                  //   id: JSON.stringify(item.id),
                  // },
                });
              }}
            >
              <div className="flex flex-col justify-between">
                <div>
                  <p className="text-xl lg:text-2xl font-bold">
                    {item.project_name}
                  </p>
                  <p className="text-xs lg:text-base">
                    {item.project_contractor}
                  </p>
                </div>
                <div className="w-[100%] flex items-center gap-2 lg:gap-4 justify-end">
                  <p className="text-xs lg:text-base">{item.district}</p>
                  <p className="text-xs lg:text-base">{item.state}</p>
                  <p className="text-xs lg:text-base">
                    {dayjs(item?.created_at?.toString()).format('DD/MM/YYYY')}
                  </p>
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
