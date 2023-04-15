import AgreementPopup from '@/components/Form/AgreementPopup';
import FormWrapper from '@/components/Form/FormWrapper';
import FormFileUpload from '@/components/GeotectInfo/FormFileUpload';
import FormProjectInfo from '@/components/GeotectInfo/FormProjectInfo';
import FormWorkshop from '@/components/GeotectInfo/FormWorkshop';
import AlertComponent from '@/components/Ui/AlertComponent';
import BreadCrumb from '@/components/Ui/BreadCrumb';
import { FieldInput } from '@/components/Ui/FieldInput';
import { API } from '@/constant';
import { useNameCtx } from '@/context/UserContext';
import { useStepForm } from '@/hooks/useStepForm';
import { Tab } from '@headlessui/react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { GeoInfo } from '../../../hooks/useGeoInfo';
import { GetServerSideProps } from 'next';
import { TypeOf } from 'zod';

interface FormData {
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
  treatment: string;
  treatment_chainage: string;
  treatment_notes: string;
  instrumentation_type: string;
  it_chainage: string;
  it_notes: string;
  doc_path: FileList | object | null;
}

interface Props {
  dataQuery: GeoInfo | any;
}

const Page = ({ dataQuery }: Props) => {
  const router = useRouter();

  const {
    id,
    state,
    district,
    project_name,
    project_contractor,
    project_cost,
    project_cost_geotechnical,
    project_duration,
    project_procurement_method,
    project_implementation_method,
    project_possession_date,
    project_completion_date,
    treatment,
    treatment_chainage,
    treatment_notes,
    instrumentation_type,
    it_chainage,
    it_notes,
    doc_path,
    doc_name,
  } = dataQuery;
  const [data, setData] = useState(dataQuery);
  const [oldPath, setOldPath] = useState<string[] | undefined>();

  function onChangeField(val: Partial<FormData>) {
    setData((prev: any) => {
      return { ...prev, ...val };
    });
  }

  const {
    steps,
    stepIndex,
    step,
    isFirstStep,
    isLastStep,
    backStep,
    nextStep,
    goToFirs,
  } = useStepForm([
    <FormProjectInfo
      key={1}
      {...data}
      onChangeField={onChangeField}
      isEdit={true}
      doc_name={doc_name}
    />,
    <FormWorkshop
      key={2}
      {...data}
      onChangeField={onChangeField}
      isEdit={true}
    />,
    // <FormFileUpload
    //   key={3}
    //   {...data}
    //   onChangeField={onChangeField}
    //   isEdit={true}
    //   setOldPath={oldPath}
    // />,
  ]);

  const [open, setOpen] = useState(false);
  const [agreement, setAgreement] = useState(false);

  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // const submitDataForm = useCallback((e: FormEvent) => {}, []);
  console.log('id', id);
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) return nextStep();
    setOpen(true);
    // setData(INITIAL_DATA);
    // goToFirs();
  }

  console.log(doc_path);

  useEffect(() => {
    if (agreement === false) {
      return;
    } else {
      try {
        API.put(
          `/project/edit/geo-info/${id}`,
          {
            data: {
              state: data.state,
              district: data.district,
              project_name: data.project_name,
              project_contractor: data.project_contractor,
              project_cost: data.project_cost,
              project_cost_geotechnical: data.project_cost_geotechnical,
              project_duration: data.project_duration,
              project_procurement_method: data.project_procurement_method,
              project_implementation_method: data.project_implementation_method,
              project_possession_date: data.project_possession_date,
              project_completion_date: data.project_completion_date,
            },
          },
          {
            headers: {
              Authorization: 'Bearer ' + Cookies.get('token'),
            },
          }
        )
          .then((res) => {
            let value = res.data;
            let idProject = value?.data[0]?.id;
            API.put(
              `/project/edit/geo-workshop/${idProject}`,
              {
                data: {
                  treatment: data.treatment,
                  treatment_chainage: data.treatment_chainage,
                  treatment_notes: data.treatment_notes,
                  instrumentation_type: data.instrumentation_type,
                  it_chainage: data.it_chainage,
                  it_notes: data.it_notes,
                },
              },
              {
                headers: {
                  Authorization: 'Bearer ' + Cookies.get('token'),
                },
              }
            )
              .then((res2) => {
                router.push('/');
                setIsOpenAlert(true);
                setIsSuccess(true);
                return res2.data;
                // let fileUploadPath = new FormData();
                // var imageFile = data.doc_path as FileList | null | any;

                // for (let idx = 0; idx < imageFile?.length; idx++) {
                //   fileUploadPath.append('doc_path', imageFile[idx]);
                // }

                // // if (oldPath !== undefined) {
                // //   for (let idx = 0; idx < oldPath.length; idx++) {
                // //     fileUploadPath.append('doc_path', oldPath[idx]);
                // //   }
                // // }

                // API.put(`/project/edit/geo-file/${idProject}`, fileUploadPath, {
                //   headers: {
                //     'Content-Type': 'multipart/form-data',
                //     Authorization: 'Bearer ' + Cookies.get('token'),
                //   },
                // })
                //   .then((res) => {
                //     // setData(INITIAL_DATA);
                //     goToFirs();
                //     setIsOpenAlert(true);
                //     setIsSuccess(true);
                //     return res.data;
                //   })
                //   .catch((err) => {
                //     setErrorMessage(err.message);
                //     setIsError(true);
                //   });
              })
              .catch((err) => {
                setIsError(true);
                setErrorMessage(err.message);
              });
          })
          .catch((err) => {
            setIsError(true);
            setErrorMessage(err.message);
          });
      } catch (error) {
        setOpen(true);
      }
    }

    return setAgreement(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agreement]);

  return (
    <>
      <BreadCrumb title="Geotechnical Info" nameProject="" isEdit={true} />
      <div className="relative w-full mt-5 lg:mt-10 ">
        <div className="flex w-full h-10 justify-between align-middle items-center">
          <h1 className="text-xl lg:text-2xl mb-2">
            {stepIndex === 0
              ? 'Project Information'
              : stepIndex === 1
              ? 'Project Workshop'
              : 'Upload Document'}
          </h1>
          <div
            className={`absolute right-2 p-2 text-sm ${
              isLastStep
                ? 'bg-green-500 text-black hover:text-white'
                : 'bg-red-500 '
            } lg:text-xl rounded-full`}
          >
            {stepIndex + 1}/{steps.length}
          </div>
        </div>
      </div>
      <div className="pb-10">
        <form onSubmit={handleSubmit}>
          <Tab.Group>
            <Tab.List className="w-full text-start flex p-1 pt-8 lg:pt-12">
              {step}
            </Tab.List>
          </Tab.Group>
          <div className="justify-between flex md:justify-end lg:justify-end gap-2 pt-3 -mb-12 mt-5">
            {isFirstStep && (
              <button
                type="button"
                onClick={backStep}
                className={`hover:bg-zinc-600 w-[50%] p-2 border border-white/40`}
              >
                Back
              </button>
            )}
            <button
              type="submit"
              className={`hover:bg-zinc-600 ${
                isFirstStep ? 'w-[50%]' : 'w-[100%]'
              } ${
                isLastStep
                  ? 'bg-green-500 text-black hover:text-white'
                  : 'bg-red-500 '
              } w-[50%] p-2 border border-white/40`}
            >
              {isLastStep ? 'Finish' : 'Next'}
            </button>
          </div>
        </form>
      </div>
      {open && (
        <AgreementPopup
          title="Are You Sure Create This Project?"
          setAgreement={setAgreement}
          isCreated={true}
          description="This project will be created when you click delete, click cancel to cancel create this project."
          setOpen={setOpen}
          open={open}
        />
      )}
      {/* <div className="relative w-full h-screen"> */}
      <AlertComponent
        isOpenAlert={isOpenAlert}
        setIsOpenAlert={setIsOpenAlert}
        isSuccess={isSuccess}
        isError={isError}
        messageSuccess="Successfully created project"
        messageError={errorMessage}
      />
      {/* </div> */}
    </>
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
