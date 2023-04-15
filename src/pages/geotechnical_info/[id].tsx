import AgreementPopup from '@/components/Form/AgreementPopup';
import AlertComponent from '@/components/Ui/AlertComponent';
import BreadCrumb from '@/components/Ui/BreadCrumb';
import { API } from '@/constant';
import { GeoInfo } from '@/hooks/useGeoInfo';
import useIdProject, { getDataFromId } from '@/hooks/useIdProject';
import { formatter } from '@/utils/currency';
import dayjs from 'dayjs';
import Cookies from 'js-cookie';
import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  InferGetServerSidePropsType,
} from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { useEffect, useState } from 'react';

interface PageProps {
  id: string | null;
}

const Page = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [agreement, setAgreement] = useState(false);
  const { id, project_name, project_contractor, project_cost }: GeoInfo = data;

  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  console.log('not clicked', agreement);
  const handleDeleteProject = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setOpen(true);
  };
  useEffect(() => {
    if (agreement === false) {
      return;
    } else {
      API.post(
        `/project/delete/${id}`,
        {},
        {
          headers: {
            Authorization: 'Bearer ' + Cookies.get('token'),
          },
        }
      )
        .then((res) => {
          setIsOpenAlert(true);
          setIsSuccess(true);
          router.push('/geotechnical_info');
        })
        .catch((error) => {
          setIsOpenAlert(true);
          setIsError(true);
          setErrorMessage(error.message);
        });
    }
    return setAgreement(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agreement]);

  return (
    <div>
      <BreadCrumb title="Geotechnical Info" nameProject={project_name} />
      <table className="w-full justify-center flex-col mt-3 text-sm lg:text-base">
        <thead>
          <tr>
            <th>No</th>
            <th>Project</th>
            <th>Description</th>
          </tr>
        </thead>
        {[data].map((value) => (
          <tbody key={value.id}>
            <tr className="flex-1">
              <td>{1}</td>
              <td>District</td>
              <td>{value.district}</td>
            </tr>
            <tr>
              <td>{2}</td>
              <td>Contractor</td>
              <td>{value.project_contractor}</td>
            </tr>
            <tr>
              <td>{3}</td>
              <td>Possession Date</td>
              <td>
                {dayjs(value.project_possession_date).format('DD/MM/YYYY')}
              </td>
            </tr>
            <tr>
              <td>{4}</td>
              <td>Complete Date</td>
              <td>
                {dayjs(value.project_completion_date).format('DD/MM/YYYY')}
              </td>
            </tr>
            <tr>
              <td>{5}</td>
              <td>Duration</td>
              <td>{value.project_duration}</td>
            </tr>
            <tr>
              <td>{6}</td>
              <td>Cost</td>
              <td>{formatter.format(parseInt(value.project_cost))}</td>
            </tr>
            <tr>
              <td>{7}</td>
              <td>Cost Geotechnical</td>
              <td>
                {formatter.format(parseInt(value.project_cost_geotechnical))}
              </td>
            </tr>
            <tr>
              <td>{8}</td>
              <td>Procurement Method</td>
              <td>{value.project_procurement_method}</td>
            </tr>
            <tr>
              <td>{9}</td>
              <td>Implementation Method</td>
              <td>{value.project_implementation_method}</td>
            </tr>
          </tbody>
        ))}
      </table>
      <div className="flex flex-col md:flex-row lg:flex-row justify-center md:justify-end lg:justify-end gap-3 mt-4">
        <button
          type="button"
          className={`hover:bg-zinc-600 w-[100%] md:w-[20%] lg:w-[20%] bg-white text-black hover:text-white p-1 border border-white/40`}
          onClick={() => router.push(`/geotechnical_info/edit/${id}`)}
        >
          Edit
        </button>
        <button
          type="button"
          className={`hover:bg-zinc-600 w-[100%] md:w-[20%] lg:w-[20%] bg-white text-black hover:text-white p-1 border border-white/40`}
          onClick={() => router.push(`/geotechnical_info/edit/file/${id}`)}
        >
          Edit File
        </button>
        <button
          type="button"
          className={`hover:bg-zinc-600 w-[100%] md:w-[20%] lg:w-[20%] bg-red-500 text-black hover:text-white p-1 border border-white/40`}
          onClick={handleDeleteProject}
        >
          Delete
        </button>
      </div>
      {open && (
        <AgreementPopup
          title="Are You Sure Delete This Project?"
          setAgreement={setAgreement}
          description="This project will be deleted when you click delete, click cancel to cancel deletion this project."
          setOpen={setOpen}
          open={open}
        />
      )}

      <AlertComponent
        isOpenAlert={isOpenAlert}
        setIsOpenAlert={setIsOpenAlert}
        isSuccess={isSuccess}
        isError={isError}
        messageSuccess="Successfully delete project"
        messageError={errorMessage}
      />
      {/* {JSON.stringify(data, null, 2)} */}
    </div>
  );
};

export default Page;

export const getServerSideProps: GetServerSideProps<{
  data: GeoInfo;
}> = async (ctx) => {
  const id = ctx?.params?.id as string;
  let loading = true;
  let data = await API.get(`/project/${id}`)
    .then((res) => {
      loading = false;
      return res.data?.data;
    })
    .catch((err) => {
      loading = false;
    });

  return {
    props: {
      data: data,
    },
  };
};
