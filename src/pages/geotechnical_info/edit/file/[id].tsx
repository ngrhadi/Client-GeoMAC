import TrashIcon from '@/assets/TrashIcon';
import FormFileUpload from '@/components/GeotectInfo/FormFileUpload';
import BreadCrumb from '@/components/Ui/BreadCrumb';
import { API } from '@/constant';
import { GeoInfo } from '@/hooks/useGeoInfo';
import Cookies from 'js-cookie';
import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react';

interface Props {
  dataQuery: GeoInfo | any;
}

const Page = ({ dataQuery }: Props) => {
  const { doc_name, doc_path } = dataQuery;
  const [data, setData] = useState(dataQuery);
  const [newFile, setNewFile] = useState<File>();
  const [oldPath, setOldPath] = useState<typeof doc_path | string>();
  const [oldFileName, setOldFileName] = useState<typeof doc_name | string>();
  const [oldFileNameArray, setOldFileNameArray] = useState<
    string[] | undefined
  >();
  const [oldPathArray, setOldPathArray] = useState<string[] | undefined>();

  function onChangeField(val: FileList | any) {
    let formData = new FormData();
    if (val.length > 1) {
      for (let i = 0; val.length; i++) {
        formData.append('doc_path', val[i]);
        setNewFile(val[i]);
        // setNewFile((prev: any) => {
        //   return { ...prev, ...val };
        // });
      }
    }
  }

  useEffect(() => {
    if (doc_path.length > 0 && doc_name.length > 0) {
      setOldPath(doc_path);
      setOldFileName(doc_name);
      setOldPathArray(oldPath?.split(','));
      setOldFileNameArray(oldFileName?.split(','));
    }
  }, [doc_name, doc_path, oldPath]);

  const handleDeleteFile = (file: string, dataPath: string[] | undefined) => {
    let pathFileDeleted = dataPath?.filter((fn) => fn.includes(file))[0];
    console.log(pathFileDeleted);
    let data = dataPath?.filter((val) => val !== pathFileDeleted);
    console.log('dataPath', data);
    // dataFile?.filter((val) => val !== file);
    // setFileEdit(dataFile?.filter((val) => val !== file));

    //   API.post(
    //     `/project/delete/geo-file/${id}`,
    //     {
    //       data: {
    //         fileNameDeleted: file,
    //         filePathDeleted: pathFileDeleted,
    //       },
    //     },
    //     {
    //       headers: {
    //         Authorization: 'Bearer ' + Cookies.get('token'),
    //       },
    //     }
    //   )
    //     .then((res) => {
    //       setFileEdit(dataFile?.filter((val) => val !== file));
    //       return res.data;
    //     })
    //     .catch((err) => console.log(err));
  };

  return (
    <div>
      <BreadCrumb title="Geotechnical Info" nameProject="" isEditFile={true} />
      <FormFileUpload
        key={3}
        {...data}
        onChangeField={onChangeField}
        isEdit={true}
      />

      {oldFileNameArray?.map((val, i) => (
        <div
          key={i}
          className="flex flex-col w-full justify-center text-center bg-zinc-300/20 text-white rounded-md my-2 p-2"
        >
          <div className="flex flex-col md:flex-row lg:flex-row w-full justify-center md:justify-between lg:justify-between px-3 items-center">
            <p className="text-center">Last File Uploaded</p>
            <p className="">{val}</p>
            <button
              className="bg-[#F3E758] flex flex-row justify-center w-full md:w-auto lg:w-auto item-center rounded-lg p-2"
              type="button"
              onClick={() => handleDeleteFile(val, oldFileNameArray)}
            >
              <TrashIcon isSmall={true} />
              <p className="md:hidden lg:hidden text-sm text-red-600 font-bold mx-3">
                Delete..!!
              </p>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Page;

export const getServerSideProps: GetServerSideProps<{
  dataQuery: GeoInfo;
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
      dataQuery: data,
    },
  };
};
