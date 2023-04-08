import FormWrapper from '@/components/Form/FormWrapper';
import FormFileUpload from '@/components/GeotectInfo/FormFileUpload';
import FormProjectInfo from '@/components/GeotectInfo/FormProjectInfo';
import FormWorkshop from '@/components/GeotectInfo/FormWorkshop';
import { FieldInput } from '@/components/Ui/FieldInput';
import { API } from '@/constant';
import { useNameCtx } from '@/context/UserContext';
import { useStepForm } from '@/hooks/useStepForm';
import { Tab } from '@headlessui/react';
import React, { FormEvent, useState } from 'react';

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

const INITIAL_DATA = {
  state: '',
  district: '',
  project_name: '',
  project_contractor: '',
  project_cost: '',
  project_cost_geotechnical: '',
  project_duration: '',
  project_procurement_method: '',
  project_implementation_method: '',
  project_possession_date: '',
  project_completion_date: '',
  treatment: '',
  treatment_chainage: '',
  treatment_notes: '',
  instrumentation_type: '',
  it_chainage: '',
  it_notes: '',
  doc_path: null,
};

const Page = () => {
  const [data, setData] = useState(INITIAL_DATA);
  const [fileList, setFileList] = useState([]);

  function onChangeField(val: Partial<FormData>) {
    setData((prev: any) => {
      return { ...prev, ...val };
      if (prev.doc_path) {
        return [prev.doc_path, val.doc_path];
      } else {
      }
    });
  }

  console.log('filesss', data.doc_path);
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
    <FormProjectInfo key={1} {...data} onChangeField={onChangeField} />,
    <FormWorkshop key={2} {...data} onChangeField={onChangeField} />,
    <FormFileUpload key={3} {...data} onChangeField={onChangeField} />,
  ]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) return nextStep();
    try {
      API.post(
        '/add-project/info',
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
            Authorization:
              'Bearer ' +
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJhZDAyYzY4LWIzNGItNGRmNi1iZTU4LTNmZjExOWUyMDNjMiIsImlhdCI6MTY4MDYzNTQwOCwiZXhwIjoxNjgwNjM1NDMzfQ.g2EI0cKoAvyph_ui3ottOVJn3ra4v9jcJ6Ho-YeHdeo',
          },
        }
      )
        .then((res) => {
          let value = res.data;
          let idProject = value?.data[0]?.id;
          API.post(
            `/add-project/workshop/${idProject}`,
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
                Authorization:
                  'Bearer ' +
                  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJhZDAyYzY4LWIzNGItNGRmNi1iZTU4LTNmZjExOWUyMDNjMiIsImlhdCI6MTY4MDYzNTQwOCwiZXhwIjoxNjgwNjM1NDMzfQ.g2EI0cKoAvyph_ui3ottOVJn3ra4v9jcJ6Ho-YeHdeo',
              },
            }
          )
            .then((res2) => {
              let fileUploadPath = new FormData();
              var imageFile = data.doc_path as FileList | null | any;

              for (let idx = 0; idx < imageFile?.length; idx++) {
                fileUploadPath.append('doc_path', imageFile[idx]);
              }

              API.post(`add-project/file/${idProject}`, fileUploadPath, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization:
                    'Bearer ' +
                    'asdeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJhZDAyYzY4LWIzNGItNGRmNi1iZTU4LTNmZjExOWUyMDNjMiIsImlhdCI6MTY4MDYzNTQwOCwiZXhwIjoxNjgwNjM1NDMzfQ.g2EI0cKoAvyph_ui3ottOVJn3ra4v9jcJ6Ho-YeHdeofasdf',
                },
              })
                .then((res) => {
                  alert('SUCCESS!');
                  setData(INITIAL_DATA);
                  goToFirs();
                  return res.data;
                })
                .catch((err) => {
                  alert('Error uploading file: ' + err.message);
                });
            })
            .catch((err) => {
              alert('Error add workshop: ' + err.message);
            });
        })
        .catch((err) => {
          alert('Error add project information: ' + err.message);
        });
    } catch (error) {}
    alert(JSON.stringify(data, undefined, 2));
    // setData(INITIAL_DATA);
    // goToFirs();
  }

  return (
    <>
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
    </>
  );
};

export default Page;
