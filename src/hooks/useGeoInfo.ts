import { API } from '@/constant';
import { useToken } from '@/context/UserContext';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export interface GeoInfo {
  id: string;
  state: string;
  district: string;
  project_name: string;
  project_contractor: string;
  project_cost: string;
  project_cost_geotechnical: string;
  project_duration: string;
  project_procurement_method: string;
  project_implementation_method: string;
  project_possession_date: string;
  project_completion_date: string;
  doc_path: string;
  doc_name: string[];
  treatment: string;
  instrumentation_type: string;
  treatment_chainage: string;
  treatment_notes: string;
  it_chainage: string;
  it_notes: string;
  created_at: string;
}

const useGeoInfo = () => {
  const router = useRouter();
  const [data, setData] = useState<GeoInfo[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      API.get('/add-project/info', {
        headers: {
          Authorization: 'Bearer ' + Cookies.get('token'),
        },
      }).then((res) => {
        let value = res.data;
        setLoading(false);
        if (value.data === undefined) {
          router.push('/error');
        } else {
          setData(value?.data);
        }
      });
    } catch (error) {
      router.push('/error');
    }
    return () => {};
  }, [router]);

  return {
    data,
    loading,
  };
};

export default useGeoInfo;
