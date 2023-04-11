import BreadCrumb from '@/components/Ui/BreadCrumb';
import { API } from '@/constant';
import { GeoInfo } from '@/hooks/useGeoInfo';
import useIdProject, { getDataFromId } from '@/hooks/useIdProject';
import { formatter } from '@/utils/currency';
import dayjs from 'dayjs';
import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  InferGetServerSidePropsType,
} from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

interface PageProps {
  id: string | null;
}

const Page = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { project_name, project_contractor, project_cost }: GeoInfo = data;
  let number = 0;
  return (
    <div>
      <BreadCrumb title="Geotechnical Info" nameProject={project_name} />
      <table className="w-full justify-center flex-col mt-3">
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
