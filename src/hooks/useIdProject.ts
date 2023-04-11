import React, { useEffect, useState } from 'react';
import { GeoInfo } from './useGeoInfo';
import { API } from '@/constant';

export const getDataFromId = async (id?: string) => {
  let loading = true;
  let data = [] as GeoInfo[];
  const result = await API.get(`/project/${id}`)
    .then((res) => {
      loading = false;
      data.push(...res.data.data[0]);
      return res.data?.data;
    })
    .catch((err) => {
      loading = false;
    });
  return {
    result,
    data,
    loading,
  };
};

const useIdProject = () => {
  const [idPrj, setIdPrj] = useState<string | string[] | undefined>();
  const [data, setData] = useState<GeoInfo | undefined>();
  // const { data } = getDataFromId()
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   if (idPrj === null) return;
  //   API.get(`/project/${idPrj}`)
  //     .then((res) => {
  //       setData(res.data?.data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       setLoading(false);
  //       setData(undefined);
  //     });
  // }, []);

  return {
    data,
    loading,
    setIdPrj,
  };
};

export default useIdProject;
